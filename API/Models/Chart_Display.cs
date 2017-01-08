using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Chart_Display
    {
        public List<string> list_lable_revenue { get; set; }
        public List<double> list_value_revenue { get; set; }
        public List<double> list_old_value_revenue { get; set; }
        public string dataset_lable { get; set; }
        public List<string> list_lable_card { get; set; }
        public List<double> list_value_card { get; set; }
        public List<double> list_old_value_card { get; set; }

        public Chart_Display(string ds_lable, List<string> lables_revenue, List<double> values_revenue, List<double> old_revenue, List<string> lables_card, List<double> values_card, List<double> old_card)
        {
            list_lable_revenue = new List<string>();
            list_lable_revenue.AddRange(lables_revenue);
            list_value_revenue = new List<double>();
            list_value_revenue.AddRange(values_revenue);
            list_old_value_revenue = new List<double>();
            list_old_value_revenue.AddRange(old_revenue);

            list_lable_card = new List<string>();
            list_lable_card.AddRange(lables_card);
            list_value_card = new List<double>();
            list_value_card.AddRange(values_card);
            list_old_value_card = new List<double>();
            list_old_value_card.AddRange(old_card);

            dataset_lable = ds_lable;
        }
    }
}