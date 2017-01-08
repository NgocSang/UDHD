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
    
    public partial class MERCHANT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MERCHANT()
        {
            this.MERCHANT_SUMMARY = new HashSet<MERCHANT_SUMMARY>();
            this.TRANSACTION_DETAIL = new HashSet<TRANSACTION_DETAIL>();
        }
    
        public string MERCHANT_NUMBER { get; set; }
        public string MERCHANT_NAME { get; set; }
        public string MERCHANT_TYPE { get; set; }
        public string MERCHANT_TELEPHONE1 { get; set; }
        public string MERCHANT_TELEPHONE2 { get; set; }
        public string MERCHANT_TELEPHONE3 { get; set; }
        public string MERCHANT_CITY { get; set; }
        public string MERCHANT_DISTRICT { get; set; }
        public string MERCHANT_STREET { get; set; }
        public string MERCHANT_STEET_NUMBER { get; set; }
        public string MERCHANT_REGION { get; set; }
        public string MERCHANT_OWNER { get; set; }
        public string MERCHANT_FAX { get; set; }
        public string MERCHANT_EMAIL1 { get; set; }
        public string MERCHANT_EMAIL2 { get; set; }
        public string MERCHANT_EMAIL3 { get; set; }
        public string MERCHANT_BANK_ACCOUNT { get; set; }
        public string MANAGE_AGENT { get; set; }
        public string BACKEND_PROCESSOR { get; set; }
        public string MERCHANT_STATUS { get; set; }
        public System.DateTime MERCHANT_APPR0VE_DATE { get; set; }
        public Nullable<System.DateTime> MERCHANT_FIRST_DATE_ACTIVATE { get; set; }
        public Nullable<System.DateTime> MERCHANT_LAST_DAY_ACTIVATE { get; set; }
    
        public virtual AGENT AGENT { get; set; }
        public virtual PROCESSOR PROCESSOR { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MERCHANT_SUMMARY> MERCHANT_SUMMARY { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TRANSACTION_DETAIL> TRANSACTION_DETAIL { get; set; }
    }
}
