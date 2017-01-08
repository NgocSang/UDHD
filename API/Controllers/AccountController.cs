using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using JWT;
using API.Models;
using API.Providers;
using API.Results;
using API.Data;
using System.Linq;
using System.Net;
using System.Data.Entity;
using System.Net.Mail;
using System.Configuration;

namespace API.Controllers
{
    public class User
    {
        public string role { set; get; }
        public string username { set; get; }
    }
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;
        public DOANPTUDHDEntities db = new DOANPTUDHDEntities();
        public AccountController()
        {
        }
        /// <summary>
        /// Tạo mới password khi người dùng quên mật khẩu.
        /// </summary>
        /// <returns>Trả về password mới do hệ thống tự động cấp phát</returns>
        public string CreatePassword()
        {
            string _allowedChars = "ABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";

            Random randNum = new Random();

            char[] chars = new char[6];

            int allowedCharCount = _allowedChars.Length;

            for (int i = 0; i < 6; i++)
            {
                chars[i] = _allowedChars[(int)((_allowedChars.Length) * randNum.NextDouble())];
                if (chars[i] == '0' || chars[i] == '1' || chars[i] == '2' || chars[i] == '3' || chars[i] == '4'
              || chars[i] == '5' || chars[i] == '6' || chars[i] == '7' || chars[i] == '8' || chars[i] == '9')
                {
                    _allowedChars = "ABCDEFGHIJKMNOPQRSTUVWXYZ";
                }
            }
            return new string(chars);
        }

        /// </summary>
        /// <param name="model">Model login chứa các thông tin cần thiết để đăng nhập bao gồm : Email, Password</param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("SignIn")]
        [HttpPost]
        public HttpResponseMessage Login(LoginViewModel model)
        {

            HttpResponseMessage response = null;
            if (ModelState.IsValid)
            {
                var existingUser = db.ACCOUNT.Where(b => b.USERNAME == model.UserName)
                                    .FirstOrDefault();

                if (existingUser == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    var loginSuccess =
                        string.Equals(EncryptPassword(model.Password, existingUser.SALT),
                            existingUser.PASSWORD);

                    if (loginSuccess)
                    {
                        object dbUser;
                        var token = CreateTokenLogin(existingUser, out dbUser);
                        response = Request.CreateResponse(new { dbUser, token });

                    }
                }
            }
            else
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            return response;
        }
        /// <summary>
        /// Giải mã password
        /// </summary>
        /// <param name="password">Password người dùng.</param>
        /// <param name="salt">Mã salt để encrypt pass</param>
        /// <returns></returns>
        public static string EncryptPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = string.Format("{0}{1}", salt, password);
                var saltedPasswordAsBytes = System.Text.Encoding.UTF8.GetBytes(saltedPassword);
                return Convert.ToBase64String(sha256.ComputeHash(saltedPasswordAsBytes));
            }
        }
        /// <summary>
        /// Tạo token cho người dùng đăng nhập facebook, google...
        /// </summary>
        /// <param name="user">Thông tin cơ bản người dùng</param>
        /// <param name="dbUser">Thông báo User trong Response</param>
        /// <returns></returns>
        private static string CreateTokenLogin(ACCOUNT user, out object dbUser)
        {
            var unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            var expiry = Math.Round((DateTime.UtcNow.AddHours(2) - unixEpoch).TotalSeconds);
            var issuedAt = Math.Round((DateTime.UtcNow - unixEpoch).TotalSeconds);
            var notBefore = Math.Round((DateTime.UtcNow.AddMonths(6) - unixEpoch).TotalSeconds);

            var payload = new Dictionary<string, object>
            {
                {"UserName", user.USERNAME},
                {"Role", user.ROLE},
                {"nbf", notBefore},
                {"iat", issuedAt},
                {"exp", expiry}
            };

            //var secret = ConfigurationManager.AppSettings.Get("jwtKey");
            const string apikey = "secretKey";

            var token = JsonWebToken.Encode(payload, apikey, JwtHashAlgorithm.HS256);
            User user1 = new User();
            user1.role = user.ROLE;
            user1.username = user.USERNAME;
            dbUser = new { user1.role, user1.username };
            return token;
        }
        /// <summary>
        /// Tạo người dùng lưu vào Database
        /// <param name="registerDetails">Model đăng kí tài khoản mới</param>
        /// <returns></returns>
        private ACCOUNT CreateUser(RegisterViewModel registerDetails)
        {
            var passwordSalt = CreateSalt();
            var user = new ACCOUNT
            {
                USERNAME = registerDetails.UserName,
                SALT = passwordSalt,
                PASSWORD = EncryptPassword(registerDetails.Password, passwordSalt),
                ROLE = registerDetails.Role

            };


            DbContextTransaction dt = db.Database.BeginTransaction();
            try
            {
                db.ACCOUNT.Add(user);
                db.SaveChanges();
                
                db.SaveChanges();
                dt.Commit();
            }
            catch (Exception ex)
            {
                dt.Rollback();
            }

            return user;
        }
        /// <summary>
        /// Tạo mã để mã hóa password
        /// </summary>
        /// <returns></returns>
        public static string CreateSalt()
        {
            var data = new byte[0x10];
            using (var cryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                cryptoServiceProvider.GetBytes(data);
                return Convert.ToBase64String(data);
            }
        }
        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
        /// <summary>
        /// Đăng kí tài khoản
        /// </summary>
        /// <param name="model">Model đăng kí tài khoản</param>
        /// <returns>response bao gồm email và token</returns>
        [AllowAnonymous]
        [Route("SignUp")]
        [HttpPost]
        public HttpResponseMessage Register(RegisterViewModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                string convert = model.UserName.ToString();
                var existingUser = db.ACCOUNT.FirstOrDefault(u => u.USERNAME == convert);

                if (existingUser != null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "User already exist.");
                }

                //Create user and save to database
                var user = CreateUser(model);

               

                response = Request.CreateResponse(HttpStatusCode.OK, new { success = true });
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false });
            }

            return response;
        }

        [AllowAnonymous]
        [Route("ForgetPassword")]
        [HttpGet]
        public bool ForegetPassword(string username)
        {
            string email;
            ACCOUNT account = db.ACCOUNT.FirstOrDefault(x => x.USERNAME == username);
            if (account == null)
            {
                return false;
            }
            MERCHANT merchant = db.MERCHANT.FirstOrDefault(x => x.MERCHANT_NUMBER == username);
            if(merchant != null) { 
                email = merchant.MERCHANT_EMAIL1;
            }
            else
            {
                AGENT agent = db.AGENT.FirstOrDefault(x => x.AGENT_NUMBER == username);
                email = agent.AGENT_EMAIL_1;
            }
            string temp = CreatePassword();
            MailMessage mailMessag = new MailMessage(ConfigurationManager.AppSettings.Get("Email"), email);
            mailMessag.Subject = "Gửi lại mật khẩu";
            mailMessag.Body = "Mật khẩu mới của bạn là: " + temp;
            SmtpClient client = new SmtpClient();
            client.Send(mailMessag);
            var passwordSalt = CreateSalt();
            account.SALT = passwordSalt;
            account.PASSWORD = EncryptPassword(temp, passwordSalt);
            db.Entry(account).State = EntityState.Modified;
            db.SaveChanges();
            return true;
        }

        [Authorize]
        [Route("ChangePassword")]
        [HttpPost]
        public HttpResponseMessage Changpassword(ChangePasswordBindingModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var existingUser = db.ACCOUNT.FirstOrDefault(u => u.USERNAME == model.UserName);

                if (existingUser == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "User not exist.");
                }
                var loginSuccess =
                        string.Equals(EncryptPassword(model.OldPassword, existingUser.SALT),
                            existingUser.PASSWORD);
                if (loginSuccess)
                {
                    //Update user and save to database
                    var passwordSalt = CreateSalt();
                    existingUser.SALT = passwordSalt;
                    existingUser.PASSWORD = EncryptPassword(model.NewPassword, passwordSalt);
                    db.Entry(existingUser).State = EntityState.Modified;
                    db.SaveChanges();
                    object dbUser;
                    //Create token
                    var token = CreateTokenLogin(existingUser, out dbUser);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true });
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false });
                }
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false });
            }
            return response;
        }
    }
}
