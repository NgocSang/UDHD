//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class TRANSACTION_DETAIL
    {
        public string TRANSACTION_ID { get; set; }
        public System.DateTime EXPIRATION_DATE { get; set; }
        public string TRANSACTION_CODE { get; set; }
        public decimal TRANSACTION_AMOUNT { get; set; }
        public System.DateTime TRANSACTION_DATE { get; set; }
        public System.TimeSpan TRANSACTION_TIME { get; set; }
        public string KEYED_ENTRY { get; set; }
        public string AUTHORIZATION_NUMBER { get; set; }
        public string TRANSACTION_DESCRIPTION { get; set; }
        public string MERCHANT_NUMBER { get; set; }
        public string BATCH_NUMBER { get; set; }
        public string ACCOUNT_NUMBER { get; set; }
        public string CARDTYPE_CODE { get; set; }
        public string COUNTRY_CODE { get; set; }
        public string FIRST_TWELVE_ACCOUNT_NUMBER { get; set; }
        public string IS_READ { get; set; }
    
        public virtual MERCHANT MERCHANT { get; set; }
    }
}
