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
    
    public partial class Sp_ShowOutbox_Result
    {
        public int ID { get; set; }
        public string SENDING_ACCOUNT { get; set; }
        public string RECEIVED_ACCOUNT { get; set; }
        public System.DateTime SENDING_DATE { get; set; }
        public string READING_STATUS { get; set; }
        public string DESCRIPTION { get; set; }
    }
}
