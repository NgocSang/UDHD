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
    [RoutePrefix("api/Agent")]
    public class AgentController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        [Authorize(Roles = "1")]
        [Route("InsertAgent")]
        [HttpPost]
        public bool insertAgent([FromBody]Models.AgentParam t)
        {
            int? kq = context.Sp_KTInsertAgent(t.BACKEND_PROCESSOR, t.AGENT_NUMBER).FirstOrDefault(); 
            if (kq == 0)
                return false;

            try
            {
                DateTime approveDate1 = new DateTime();
                DateTime firstDateActive1 = new DateTime();
                if (t.AGENT_FIRST_DATE_ACTIVATE == null)
                {
                    approveDate1 = DateTime.Parse(t.AGENT_APPR0VE_DATE);
                    var result = context.Sp_InsertAgent(t.AGENT_NUMBER, t.AGENT_NAME, t.AGENT_TELEPHONE1, t.AGENT_TELEPHONE2, t.AGENT_TELEPHONE3, t.AGENT_CITY, t.AGENT_DISTRICT, t.AGENT_STREET, t.AGENT_STREET_NUMBER, t.AGENT_REGION, t.AGENT_OWNER, t.AGENT_FAX, t.AGENT_EMAIL_1, t.AGENT_EMAIL_2, t.AGENT_EMAIL_3, t.AGENT_BANK_ACCOUNT, t.BACKEND_PROCESSOR, t.AGENT_STATUS, approveDate1, null);
                }
                else
                {
                    approveDate1 = DateTime.Parse(t.AGENT_APPR0VE_DATE);
                    firstDateActive1 = DateTime.Parse(t.AGENT_FIRST_DATE_ACTIVATE);
                    var result = context.Sp_InsertAgent(t.AGENT_NUMBER, t.AGENT_NAME, t.AGENT_TELEPHONE1, t.AGENT_TELEPHONE2, t.AGENT_TELEPHONE3, t.AGENT_CITY, t.AGENT_DISTRICT, t.AGENT_STREET, t.AGENT_STREET_NUMBER, t.AGENT_REGION, t.AGENT_OWNER, t.AGENT_FAX, t.AGENT_EMAIL_1, t.AGENT_EMAIL_2, t.AGENT_EMAIL_3, t.AGENT_BANK_ACCOUNT, t.BACKEND_PROCESSOR, t.AGENT_STATUS, approveDate1, firstDateActive1);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
        [Authorize]
        [Route("SearchAgent")]
        [HttpGet]
        public List<Sp_SearchAgent_Result> SearchAgent(string agentNumber, string agentBankNumber, string agentDistrict, DateTime? agentApprovedDate, string merchantType)
        {
            try
            {
                List<Sp_SearchAgent_Result> result = context.Sp_SearchAgent(agentNumber,agentBankNumber, agentDistrict, agentApprovedDate, merchantType).ToList();
                return result;
            }
            catch
            {
                return null;
            }
        }
        [Authorize(Roles = "1")]
        [Route("ActDeactAgent")]
        [HttpPost]
        public int? ActDeactAgent(string agentNumber)
        {
            try
            {
                int? result = context.Sp_ActDeactAgent(agentNumber);
                return result;
            }
            catch
            {
                return null;
            }
        }
        [Authorize(Roles = "1")]
        [Route("LoadMerchantnoAgent")]
        [HttpGet]
        public List<Sp_LoadMerchantNoAgent_Result> LoadMerchantnoAgent()
        {
            List<Sp_LoadMerchantNoAgent_Result> A = new List<Sp_LoadMerchantNoAgent_Result>();
            var result = context.Sp_LoadMerchantNoAgent().ToList();
            A = result;
            return A;
        }
        [Authorize(Roles = "1")]
        [Route("RemoveAgentOfMerchant")]
        [HttpPost]
        public int RemoveAgentOfMerchant(string MERCHANT_NUMBER)
        {
            int i = context.Sp_RemoveAgentOfMerchant(MERCHANT_NUMBER);
            return i;
        }
        [Authorize(Roles = "2")]
        [Route("UpdateAgent")]
        [HttpPost]
        public bool UpdateAgent([FromBody]UpdateAgentParam param)
        {
            try
            {
                context.Sp_UpdateAgent(param.AGENT_NUMBER, param.AGENT_NAME, param.AGENT_TELEPHONE1, param.AGENT_TELEPHONE2, param.AGENT_TELEPHONE3, param.AGENT_CITY, param.AGENT_CITY, param.AGENT_STREET, param.AGENT_STREET_NUMBER, param.AGENT_REGION, param.AGENT_OWNER, param.AGENT_FAX, param.AGENT_EMAIL_1, param.AGENT_EMAIL_2, param.AGENT_EMAIL_3,param.AGENT_BANK_ACCOUNT);
                return true;
            }
            catch
            {
                return false;
            }
        }
        [Authorize(Roles = "1")]
        [Route("UpdateAgentOfMerchant")]
        [HttpPost]
        public int UpdateAgentOfMerchant(string MERCHANT_NUMBER, string AGENT_NUMBER)
        {
            int i = context.Sp_UpdateAgentOfMerchant(MERCHANT_NUMBER, AGENT_NUMBER);
            return i;
        }
        [Authorize(Roles = "1")]
        [Route("LoadMerchantofAgent")]
        [HttpGet]
        public List<Sp_LoadMerchantOfAgent_Result> LoadMerchantofAgent(string AGENT_NUMBER)
        {
            
            List<Sp_LoadMerchantOfAgent_Result> A = new List<Sp_LoadMerchantOfAgent_Result>();
            var result = context.Sp_LoadMerchantOfAgent(AGENT_NUMBER).ToList();
            A = result;
            return A;
        }
        [Authorize(Roles = "1")]
        [Route("LoadMerchantOfOtherAgent")]
        [HttpGet]
        public List<Sp_LoadMerchantOtherAgent_Result> LoadMerchantOfOtherAgent(string AGENT_NUMBER)
        {
            List<Sp_LoadMerchantOtherAgent_Result> A = new List<Sp_LoadMerchantOtherAgent_Result>();
            var result = context.Sp_LoadMerchantOtherAgent(AGENT_NUMBER).ToList();
            A = result;
            return A;
        }
    }
}
