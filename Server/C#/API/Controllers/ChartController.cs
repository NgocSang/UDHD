using API.Data;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    [Authorize]
    public class ChartController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        [HttpGet]
        public Chart_Display getRevenue(string agent, string merchant, string loaiMerchant, string city, DateTime? ngay, int? thang, int? namthang, int? quy, int? namquy,int? nam, string role)
        {
            List<Sp_Revenue_Result> dt = context.Sp_Revenue(agent, merchant, loaiMerchant, city, ngay, thang, namthang, quy, namquy, nam).ToList().OrderBy(i => i.REPORT_DATE).ToList();
            List<double> value = new List<double>();
            List<double> old_value = new List<double>();
            List<string> lables = new List<string>();
            List<string> merchant_list = new List<string>();
            List<string> labels_card = new List<string>();
            List<double> values_card = new List<double>();
            List<double> old_values_card = new List<double>();
            merchant_list = dt.Select(i => i.MERCHANT_NUMBER).Distinct().ToList();
            
            labels_card.Add("ForeignCard");
            labels_card.Add("MasterCard");
            labels_card.Add("DebitCard");
            labels_card.Add("AmericanExpressCard");
            labels_card.Add("VisaCard");
            labels_card.Add("OtherCard");
            double foreign = (double)dt.Sum(i => i.FOREIGN_CARD_SALES_AMOUNT);
            double master = (double)dt.Sum(i => i.MASTER_CARD_SALES_AMOUNT);
            double debit = (double)dt.Sum(i => i.DEBIT_CARD_SALES_AMOUNT);
            double american = (double)dt.Sum(i => i.AMERICANEXPRESS_CARD_SALES_AMOUNT);
            double visa = (double)dt.Sum(i => i.VISA_CARD_SALES_AMOUNT);
            double other = (double)dt.Sum(i => i.OTHER_CARD_SALES_AMOUNT);
            values_card.Add(foreign);
            values_card.Add(master);
            values_card.Add(debit);
            values_card.Add(american);
            values_card.Add(visa);
            values_card.Add(other);
            if (ngay != null || namthang != null || namquy != null)
            {
                if (ngay != null)
                    ngay = ngay.Value.AddYears(-1);
                if (namthang != null)
                    namthang = namthang - 1;
                if (namquy != null)
                    namquy = namquy - 1;
            }
            List<Sp_Revenue_Result> dt_old = context.Sp_Revenue(agent, merchant, loaiMerchant, city,ngay, thang, namthang, quy, namquy, nam).ToList();

            if ((thang != null || quy != null || nam != null)&& role == "3")
            {
                List<DateTime> list_report_date = new List<DateTime>();
                list_report_date = dt.Select(i => i.REPORT_DATE.Date).Distinct().ToList();

                foreach (DateTime date in list_report_date)
                {
                    double revenue = (double)dt.Where(i => i.REPORT_DATE.Date == date).Sum(i => i.NET_AMOUNT);
                    value.Add(revenue);
                    lables.Add(date.Day.ToString() + "-" + date.Month.ToString());
                }

                list_report_date = dt_old.Select(i => i.REPORT_DATE.Date).Distinct().ToList();

                foreach (DateTime date in list_report_date)
                {
                    double revenue = (double)dt_old.Where(i => i.REPORT_DATE.Date == date).Sum(i => i.NET_AMOUNT);
                    old_value.Add(revenue);
                }
            }
            else
            {
                merchant_list = dt.Select(i => i.MERCHANT_NUMBER).Distinct().ToList();
                foreach (string merchant_number in merchant_list)
                {
                    List<Sp_Revenue_Result> revenue_of_merchant = dt.Where(i => i.MERCHANT_NUMBER == merchant_number).ToList();
                    double sum_revenue = (double)revenue_of_merchant.Sum(i => i.NET_AMOUNT);
                    value.Add(sum_revenue);
                    lables.Add(merchant_number);
                }
                foreach (string merchant_number in merchant_list)
                {
                    List<Sp_Revenue_Result> revenue_of_merchant = dt_old.Where(i => i.MERCHANT_NUMBER == merchant_number).ToList();
                    double sum_revenue = (double)revenue_of_merchant.Sum(i => i.NET_AMOUNT);
                    old_value.Add(sum_revenue);
                }
            }
            foreign = (double)dt_old.Sum(i => i.FOREIGN_CARD_SALES_AMOUNT);
            master = (double)dt_old.Sum(i => i.MASTER_CARD_SALES_AMOUNT);
            debit = (double)dt_old.Sum(i => i.DEBIT_CARD_SALES_AMOUNT);
            american = (double)dt_old.Sum(i => i.AMERICANEXPRESS_CARD_SALES_AMOUNT);
            visa = (double)dt_old.Sum(i => i.VISA_CARD_SALES_AMOUNT);
            other = (double)dt_old.Sum(i => i.OTHER_CARD_SALES_AMOUNT);
            old_values_card.Add(foreign);
            old_values_card.Add(master);
            old_values_card.Add(debit);
            old_values_card.Add(american);
            old_values_card.Add(visa);
            old_values_card.Add(other);

            Chart_Display rv = new Chart_Display("Revenue Search", lables, value, old_value, labels_card, values_card, old_values_card);
            return rv;
            /*List<Test_Revenue_Result> dt = context.Test_Revenue(agent, merchant, loaiMerchant, ngay, thang, namthang, quy, namquy).ToList().OrderBy(i => i.REPORT_DATE).ToList();

            if (ngay != null)
            {
                ngay = ngay.Value.AddYears(-1);
            }
            if (thang != null)
            {
                namthang = namthang - 1;
            }
            if (quy != null)
            {
                namquy = namquy - 1;
            }

            List<Test_Revenue_Result> dt_old = context.Test_Revenue(agent, merchant, loaiMerchant, ngay, thang, namthang, quy, namquy).ToList().OrderBy(i => i.REPORT_DATE).ToList();

            List<double> value = new List<double>();
            List<double> old_value = new List<double>();
            List<string> lables = new List<string>();
            List<string> merchant_list = new List<string>();
            List<string> labels_card = new List<string>();
            List<double> values_card = new List<double>();
            List<double> old_values_card = new List<double>();
            if (thang != null || quy != null)
            {
                foreach (Test_Revenue_Result rev in dt)
                {
                    value.Add((double)rev.NET_AMOUNT);
                    lables.Add(rev.REPORT_DATE.ToString());
                }

                foreach (Test_Revenue_Result rev in dt_old)
                {
                    value.Add((double)rev.NET_AMOUNT);
                    lables.Add(rev.REPORT_DATE.ToString());
                }
            }
            else
            {
                merchant_list = dt.Select(i => i.MERCHANT_NUMBER).Distinct().ToList();
                foreach (string merchant_number in merchant_list)
                {
                    List<Test_Revenue_Result> revenue_of_merchant = dt.Where(i => i.MERCHANT_NUMBER == merchant_number).ToList();
                    double sum_revenue = (double)revenue_of_merchant.Sum(i => i.NET_AMOUNT);
                    value.Add(sum_revenue);
                    lables.Add(merchant_number);
                }
            }

            labels_card.Add("ForeignCard");
            labels_card.Add("MasterCard");
            labels_card.Add("DebitCard");
            labels_card.Add("AmericanExpressCard");
            labels_card.Add("VisaCard");
            labels_card.Add("OtherCard");
            double foreign = (double)dt.Sum(i => i.FOREIGN_CARD_SALES_AMOUNT);
            double master = (double)dt.Sum(i => i.MASTER_CARD_SALES_AMOUNT);
            double debit = (double)dt.Sum(i => i.DEBIT_CARD_SALES_AMOUNT);
            double american = (double)dt.Sum(i => i.AMERICANEXPRESS_CARD_SALES_AMOUNT);
            double visa = (double)dt.Sum(i => i.VISA_CARD_SALES_AMOUNT);
            double other = (double)dt.Sum(i => i.OTHER_CARD_SALES_AMOUNT);
            values_card.Add(foreign);
            values_card.Add(master);
            values_card.Add(debit);
            values_card.Add(american);
            values_card.Add(visa);
            values_card.Add(other);
            foreign = (double)dt_old.Sum(i => i.FOREIGN_CARD_SALES_AMOUNT);
            master = (double)dt_old.Sum(i => i.MASTER_CARD_SALES_AMOUNT);
            debit = (double)dt_old.Sum(i => i.DEBIT_CARD_SALES_AMOUNT);
            american = (double)dt_old.Sum(i => i.AMERICANEXPRESS_CARD_SALES_AMOUNT);
            visa = (double)dt_old.Sum(i => i.VISA_CARD_SALES_AMOUNT);
            other = (double)dt_old.Sum(i => i.OTHER_CARD_SALES_AMOUNT);
            old_values_card.Add(foreign);
            old_values_card.Add(master);
            old_values_card.Add(debit);
            old_values_card.Add(american);
            old_values_card.Add(visa);
            old_values_card.Add(other);

            Chart_Display rv = new Chart_Display("Revenue Search", lables, value, old_value, labels_card, values_card, old_values_card);
            return rv;*/
        }
    }
}
