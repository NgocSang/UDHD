package com.nhatnguyen.webservice;


import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nhatnguyen.model.RetrivalModel;
import com.nhatnguyen.pojo.Retrival;


@Path("/api/retrival")
public class RetrivalWS {
	private RetrivalModel rm = new RetrivalModel();
	
//	@GET
//	@Path("/retrival")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Retrival> getAllRetrival() {
//		List<Retrival> list = new ArrayList<>();
//		list = rm.getAll();
//		return list;
//	}
	
	@POST
	@Path("/searchRetrival")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Retrival> searchRetrival(Retrival retrival) {
		List<Retrival> list = new ArrayList<Retrival>();
		list = rm.searchRetrival(retrival);
		return list;
	}
}
