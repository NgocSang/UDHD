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
    [RoutePrefix("api/Message")]
    public class MessageController : ApiController
    {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
        [Route("ShowInbox")]
        [HttpGet]
        public List<Sp_ShowInbox_Result> ShowInbox(string receiver)
        {
            List<Sp_ShowInbox_Result> resulut = context.Sp_ShowInbox(receiver).ToList();
            return resulut;
        }

        [Route("CountUnreadMessage")]
        [HttpGet]

        public int? CountUnreadMessage(string receiver)
        {
            int? result = context.Sp_CountUnreadMessage(receiver).First();
            return result;
        }
        [Route("ReadMessage")]
        [HttpPost]
        public int ReadMessage(string idMessage)
        {
            int result = context.Sp_UpdateMessageStatus(idMessage);
            return result;
        }
        [Route("DeleteMessage")]
        [HttpPost]
        public int DeleteMessage(string idMessage)
        {
            int result = context.Sp_DeleteMessage(idMessage);
            return result;
        }
        
    }
}
