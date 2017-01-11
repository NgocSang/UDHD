
using API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    
    [RoutePrefix("api/Merchant")]
    public class MerchantController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        [Authorize]
        [Route("Searchmerchant")]
        [HttpGet]
        public List<Sp_SearchMerchant_Result> Searchmerchant(string merchant_number, string merchant_address, string merchant_type, string agent_manager, string merchant_name)

        {
            List<Sp_SearchMerchant_Result> result = new List<Sp_SearchMerchant_Result>();
            result = context.Sp_SearchMerchant(merchant_number, merchant_name, merchant_type, agent_manager, merchant_address).ToList();
            return result;
        }
        [Authorize(Roles = "1")]
        [Route("Update")]
        [HttpPost]

        public int Update(string merchant_number, string status)
        {
            try
            {
                context.Sp_Updatestatusmerchant(merchant_number, status);
                return 1;
            }
            catch
            {
                return 0;
            }

        }
        
    }
}
