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
    public class RevenueController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        //[HttpGet]
        //public Revenue getCardSummaryData(string merchant_id, int month, int year)
        //{
        //    List<sp_Report_Month_Result> dt = context.sp_Report_Month(merchant_id, month, year).ToList();
        //    List<double> value = new List<double>();

        //    for (int i = 0; i < dt.Count; i++)
        //    {
        //        double revenue = double.Parse(dt[i].NET_AMOUNT.ToString());
        //        value.Add(revenue);
        //    }

        //    Revenue rv = new Revenue(merchant_id, month, value);
        //    return rv;
        //}
        [HttpGet]
        public List<Sp_Revenue_Result> getRevenue(string agent, string merchant, string loaiMerchant, DateTime? ngay, int? thang, int? namthang, int? quy, int? namquy)
        {
            List<Sp_Revenue_Result> result = new List<Sp_Revenue_Result>();
            result = context.Sp_Revenue(agent, merchant, loaiMerchant, ngay, thang, namthang, quy, namquy).ToList();
            return result;
        }
    }
}
