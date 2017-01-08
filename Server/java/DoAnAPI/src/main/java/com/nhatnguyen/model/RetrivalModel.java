package com.nhatnguyen.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.nhatnguyen.pojo.Retrival;

public class RetrivalModel {
	public List<Retrival> getAll() {
		// Session session = MySessionFactory.getSessionFactory().openSession();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		List<Retrival> list = new ArrayList<Retrival>();

		try {
			session.beginTransaction();
			list = session.createCriteria(Retrival.class).list();
			session.getTransaction();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
	}

	private java.sql.Date convertToSqlDate(Date utilDate) {
		Calendar calendar = Calendar.getInstance();
		if (utilDate != null) {
			calendar.setTime(utilDate);
			return new java.sql.Date(calendar.getTime().getTime());
		}
		return null;
	}

	public List<Retrival> searchRetrival(Retrival retrival) {
		List<Retrival> result = new ArrayList<Retrival>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			PreparedStatement preparedStatement = session.connection().prepareStatement("{CALL SP_RETRIVAL(?,?)}");
			preparedStatement.setString(1, retrival.getRetrivalId());
			preparedStatement.setDate(2, convertToSqlDate(retrival.getRetrivalDate()));
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				String retrivalID = resultSet.getString("RETRIVAL_ID");
				String transactionID = resultSet.getString("TRANSACTION_ID");
				java.util.Date date = resultSet.getDate("RETRIVAL_DATE");
				String descriptionRetrival = resultSet.getString("RETRIVAL_DESCRIPTION");

				Retrival retrival2 = new Retrival(retrivalID, transactionID, date, descriptionRetrival);
				result.add(retrival2);

			}
			session.getTransaction().commit();
		} catch (HibernateException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			session.close();
		}

		return result;
	}
}
