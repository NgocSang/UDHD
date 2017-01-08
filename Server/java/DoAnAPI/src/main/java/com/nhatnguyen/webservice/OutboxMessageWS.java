package com.nhatnguyen.webservice;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.nhatnguyen.model.OutboxMessageModel;
import com.nhatnguyen.pojo.Message;

@Path("/api/outboxMessage")
public class OutboxMessageWS {
	private OutboxMessageModel model = new OutboxMessageModel();
	
	@PUT
	@Path("/sendMessage")
	@Produces(MediaType.APPLICATION_JSON)
	public String sendMessage(@QueryParam("sender") String sender, @QueryParam("receiver") String receiver, @QueryParam("description") String description) {
		
		int result = model.sendMessage(sender, receiver, description);
		
		return Integer.toString(result);
	}
	
	@GET
	@Path("/showOutbox")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Message> showOutbox(@QueryParam("sender") String sender) {
		List<Message> list = new ArrayList<>();
		list = model.showOutbox(sender);
		return list;
	}
}
