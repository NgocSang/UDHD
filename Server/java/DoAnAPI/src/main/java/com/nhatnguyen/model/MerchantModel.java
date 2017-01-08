package com.nhatnguyen.model;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.nhatnguyen.pojo.Merchant;;

public class MerchantModel {
	public List<Merchant> getAll() {
		// Session session = MySessionFactory.getSessionFactory().openSession();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		List<Merchant> list = new ArrayList<Merchant>();

		try {
			session.beginTransaction();
			list = session.createCriteria(Merchant.class).list();
			session.getTransaction();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
	}

	public Merchant getMerchant(String merchantNumber) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Merchant merchant = new Merchant();
		try {
			session.beginTransaction();
			merchant = (Merchant) session.get(Merchant.class, merchantNumber);
			session.getTransaction().commit();
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			/* session.getTransaction().rollback(); */
		}
		return merchant;
	}

	public int updateMerchant(Merchant merchant) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		int result = -1;
		try {
			Transaction transaction = session.beginTransaction();
			PreparedStatement preparedStatement = session.connection()
					.prepareStatement("{CALL Sp_UpdateMerchant(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			preparedStatement.setString(1, merchant.getMerchantNumber());
			preparedStatement.setString(2, merchant.getMerchantName());
			preparedStatement.setString(3, merchant.getMerchantType());
			preparedStatement.setString(4, merchant.getMerchantTelephone1());
			preparedStatement.setString(5, merchant.getMerchantTelephone2());
			preparedStatement.setString(6, merchant.getMerchantTelephone3());
			preparedStatement.setString(7, merchant.getMerchantCity());
			preparedStatement.setString(8, merchant.getMerchantDistrict());
			preparedStatement.setString(9, merchant.getMerchantStreet());
			preparedStatement.setString(10, merchant.getMerchantSteetNumber());
			preparedStatement.setString(11, merchant.getMerchantRegion());
			preparedStatement.setString(12, merchant.getMerchantOwner());
			preparedStatement.setString(13, merchant.getMerchantFax());
			preparedStatement.setString(14, merchant.getMerchantEmail1());
			preparedStatement.setString(15, merchant.getMerchantEmail2());
			preparedStatement.setString(16, merchant.getMerchantEmail3());
			preparedStatement.setString(17, merchant.getMerchantBankAccount());
			preparedStatement.setDate(18, cvtIntoSqlDate(merchant.getMerchantLastDayActivate()));
			result = preparedStatement.executeUpdate();
			session.getTransaction().commit();
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			/* session.getTransaction().rollback(); */
		}
		return result;
	}
	
	public int insertMerchant(Merchant merchant) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		int result = -1;
		try {
			Transaction transaction = session.beginTransaction();
			PreparedStatement preparedStatement = session.connection()
					.prepareStatement("{CALL Sp_InsertMerchant(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			preparedStatement.setString(1, merchant.getMerchantNumber());
			preparedStatement.setString(2, merchant.getMerchantName());
			preparedStatement.setString(3, merchant.getMerchantType());
			preparedStatement.setString(4, merchant.getMerchantTelephone1());
			preparedStatement.setString(5, merchant.getMerchantTelephone2());
			preparedStatement.setString(6, merchant.getMerchantTelephone3());
			preparedStatement.setString(7, merchant.getMerchantCity());
			preparedStatement.setString(8, merchant.getMerchantDistrict());
			preparedStatement.setString(9, merchant.getMerchantStreet());
			preparedStatement.setString(10, merchant.getMerchantSteetNumber());
			preparedStatement.setString(11, merchant.getMerchantRegion());
			preparedStatement.setString(12, merchant.getMerchantOwner());
			preparedStatement.setString(13, merchant.getMerchantFax());
			preparedStatement.setString(14, merchant.getMerchantEmail1());
			preparedStatement.setString(15, merchant.getMerchantEmail2());
			preparedStatement.setString(16, merchant.getMerchantEmail3());
			preparedStatement.setString(17, merchant.getMerchantBankAccount());
			preparedStatement.setString(18, merchant.getAgent().getAgentNumber());
			
			preparedStatement.setString(19, merchant.getProcessor().getProcessorId());
			preparedStatement.setString(20, merchant.getMerchantStatus());
			preparedStatement.setDate(21, cvtIntoSqlDate(merchant.getMerchantAppr0veDate()));
			preparedStatement.setDate(22, cvtIntoSqlDate(merchant.getMerchantFirstDateActivate()));
			result = preparedStatement.executeUpdate();
			session.getTransaction().commit();
			session.close();
			return result;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return result;
			/* session.getTransaction().rollback(); */
		}
	}
	
	private Date cvtIntoSqlDate(java.util.Date utilDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(utilDate);
		return new java.sql.Date(calendar.getTime().getTime());
	}
}
