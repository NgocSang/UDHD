using API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace Server.Controllers
{
    [Authorize]
    [RoutePrefix("api/Revenue")]
    public class RevenueController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        [Route("getRevenue")]
        [HttpGet]

        public List<Sp_Revenue_Result> getRevenue(string agent, string merchant, string loaiMerchant,string city, DateTime? ngay, int? thang, int? namthang, int? quy, int? namquy, int? nam)
        {
            List<Sp_Revenue_Result> result = new List<Sp_Revenue_Result>();
            result = context.Sp_Revenue(agent, merchant, loaiMerchant, city, ngay, thang, namthang, quy, namquy, nam).ToList();
            return result;
        }
        [Route("getRevenueOption")]
        [HttpGet]
        public List<Sp_Revenue_Option_Result> getRevenueOption(string agent, string merchant, string loaiMerchant,string city, DateTime? ngay, int? thang, int? namthang, int? quy, int? namquy, int? nam)
        {
            List<Sp_Revenue_Option_Result> result = new List<Sp_Revenue_Option_Result>();
            result = context.Sp_Revenue_Option(agent, merchant, loaiMerchant, city, ngay, thang, namthang, quy, namquy, nam).ToList();
            return result;
        }
    }
}
