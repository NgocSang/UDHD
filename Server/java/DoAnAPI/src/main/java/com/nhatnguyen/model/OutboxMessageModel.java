package com.nhatnguyen.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


import org.hibernate.Session;
import org.hibernate.Transaction;

import com.nhatnguyen.pojo.Account;
import com.nhatnguyen.pojo.Message;

public class OutboxMessageModel {
	public int sendMessage(String sender, String receiver, String description) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		
		try {
			Transaction transaction = session.beginTransaction();
            
            Connection connection = session.connection();
            PreparedStatement preStatement = connection.prepareStatement("{CALL Sp_SendMessage(?,?,?)}");
            preStatement.setString(1, (sender == null) ? "" : sender);
            preStatement.setString(2, (receiver == null) ? "" : receiver);
            preStatement.setString(3, (description == null) ? "" : description);
            
            int result = preStatement.executeUpdate();
            
			session.getTransaction().commit();
			session.close();
			
			return result;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			/* session.getTransaction().rollback(); */
			return -2;
		}
	}
	
	public List<Message> showOutbox(String sender) {
		// Session session = MySessionFactory.getSessionFactory().openSession();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		List<Message> list = new ArrayList<Message>();
		
		//QueryRunner run = new QueryRunner();
		try {
			Transaction transaction = session.beginTransaction();
            
            Connection connection = session.connection();
            
            PreparedStatement preStatement = connection.prepareStatement("{CALL Sp_ShowOutbox(?)}");
            preStatement.setString(1, (sender == null) ? "" : sender);
            
            ResultSet resultSet = preStatement.executeQuery();
            
            if (resultSet != null) {
            
            while (resultSet.next()) {           	
            	Account account_sender = new Account(resultSet.getString("SENDING_ACCOUNT"));
                Account account_receiver = new Account(resultSet.getString("RECEIVED_ACCOUNT"));
                
            	list.add( new Message(
	            			resultSet.getInt("ID"),
	            			account_receiver,
	            			account_sender,
	            			resultSet.getDate("SENDING_DATE"),
	            			resultSet.getString("READING_STATUS"),
	            			resultSet.getString("DESCRIPTION")));
            }
            }
            
			//ResultSetHandler<List<Message>> resultSetHandler = new BeanListHandler<Message>(Message.class);
			//list = run.query(connection, "EXEC Sp_ShowOutbox @sender=?", resultSetHandler, sender);
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
	}

}
