package com.nhatnguyen.webservice;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;

import com.nhatnguyen.model.MerchantModel;
import com.nhatnguyen.model.RetrivalModel;
import com.nhatnguyen.pojo.Merchant;
import com.nhatnguyen.pojo.Retrival;

@Path("/api")
public class MerchantWS {

	private RetrivalModel rm = new RetrivalModel();
	private MerchantModel mm = new MerchantModel();

	@GET
	@Path("/merchant/{merchantNumber}")
	@Produces(MediaType.APPLICATION_JSON)
	public Merchant getMerchant(@PathParam("merchantNumber") String merchantNumber) {
		return mm.getMerchant(merchantNumber);
	}

	@GET
	@Path("/merchant")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Merchant> getAll() {
		List<Merchant> list = new ArrayList<>();
		list = mm.getAll();
		return list;
	}

	@PUT
	@Path("/merchant")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateMerchant(Merchant merchant) {
		JsonNodeFactory jsonNodeFactory = JsonNodeFactory.instance;
		ObjectNode resultNode = jsonNodeFactory.objectNode();
		if (merchant != null) {
			mm.updateMerchant(merchant);
			resultNode.put("success", true);
			return resultNode.toString();
		}
		resultNode.put("success", false);

		return resultNode.toString();
	}
	
	@POST
	@Path("/merchant")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean insertMerchant(Merchant merchant) {
		int t;
		if (merchant != null) {
			t = mm.insertMerchant(merchant);
			if(t != -1)
				return true;
			else
				return false;
		}
		else
			return false;
	}
	
//	@GET
//	@Path("/retrival")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Retrival> getAllRetrival() {
//		List<Retrival> list = new ArrayList<>();
//		list = rm.getAll();
//		return list;
//	}
//	
//	@POST
//	@Path("/retrival")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Retrival> searchRetrival(Retrival retrival) {
//		List<Retrival> list = new ArrayList<Retrival>();
//		list = rm.searchRetrival(retrival);
//		return list;
//	}
}
