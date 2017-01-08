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
    [RoutePrefix("api/MessageOutbox")]
        public class MessageOutboxController : ApiController
        {
        DOANPTUDHDEntities context = new DOANPTUDHDEntities();
            [Route("ShowOutbox")]
            [HttpGet]

            public List<Sp_ShowOutbox_Result> ShowInbox(string sender)
            {
                List<Sp_ShowOutbox_Result> resulut = context.Sp_ShowOutbox(sender).ToList();
                return resulut;
            }
            [Route("DeleteMessage")]
            [HttpPost]
            public int DeleteMessage(string idMessage)
            {
                int result = context.Sp_DeleteMessageOutbox(idMessage);
                return result;
            }
            [Route("SendMessage")]
            [HttpPost]
            public int? SendMessage(string sender, string receiver, string description)
            {
                int? result = context.Sp_SendMessage(sender, receiver, description);
                return result;
            }

        }
}