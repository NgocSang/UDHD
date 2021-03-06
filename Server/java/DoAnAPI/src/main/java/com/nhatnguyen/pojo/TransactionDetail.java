package com.nhatnguyen.pojo;
// Generated Dec 4, 2016 9:17:20 PM by Hibernate Tools 3.6.0.Final

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 * TransactionDetail generated by hbm2java
 */
@Entity
@Table(name = "TRANSACTION_DETAIL", uniqueConstraints = @UniqueConstraint(columnNames = "AUTHORIZATION_NUMBER"))
public class TransactionDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6616247589926356409L;
	private String transactionId;
	private Merchant merchant;
	private Date expirationDate;
	private String transactionCode;
	private long transactionAmount;
	private Date transactionDate;
	private Date transactionTime;
	private String keyedEntry;
	private String authorizationNumber;
	private String transactionDescription;
	private String batchNumber;
	private String accountNumber;
	private String cardtypeCode;
	private String countryCode;
	private String firstTwelveAccountNumber;
	private String isRead;

	public TransactionDetail() {
	}

	public TransactionDetail(String transactionId, Merchant merchant, Date expirationDate, String transactionCode,
			long transactionAmount, Date transactionDate, Date transactionTime, String keyedEntry,
			String authorizationNumber, String batchNumber, String accountNumber, String cardtypeCode,
			String countryCode, String firstTwelveAccountNumber, String isRead) {
		this.transactionId = transactionId;
		this.merchant = merchant;
		this.expirationDate = expirationDate;
		this.transactionCode = transactionCode;
		this.transactionAmount = transactionAmount;
		this.transactionDate = transactionDate;
		this.transactionTime = transactionTime;
		this.keyedEntry = keyedEntry;
		this.authorizationNumber = authorizationNumber;
		this.batchNumber = batchNumber;
		this.accountNumber = accountNumber;
		this.cardtypeCode = cardtypeCode;
		this.countryCode = countryCode;
		this.firstTwelveAccountNumber = firstTwelveAccountNumber;
		this.isRead = isRead;
	}

	public TransactionDetail(String transactionId, Merchant merchant, Date expirationDate, String transactionCode,
			long transactionAmount, Date transactionDate, Date transactionTime, String keyedEntry,
			String authorizationNumber, String transactionDescription, String batchNumber, String accountNumber,
			String cardtypeCode, String countryCode, String firstTwelveAccountNumber, String isRead) {
		this.transactionId = transactionId;
		this.merchant = merchant;
		this.expirationDate = expirationDate;
		this.transactionCode = transactionCode;
		this.transactionAmount = transactionAmount;
		this.transactionDate = transactionDate;
		this.transactionTime = transactionTime;
		this.keyedEntry = keyedEntry;
		this.authorizationNumber = authorizationNumber;
		this.transactionDescription = transactionDescription;
		this.batchNumber = batchNumber;
		this.accountNumber = accountNumber;
		this.cardtypeCode = cardtypeCode;
		this.countryCode = countryCode;
		this.firstTwelveAccountNumber = firstTwelveAccountNumber;
		this.isRead = isRead;
	}

	@Id

	@Column(name = "TRANSACTION_ID", unique = true, nullable = false)
	public String getTransactionId() {
		return this.transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MERCHANT_NUMBER", nullable = false)
	public Merchant getMerchant() {
		return this.merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "EXPIRATION_DATE", nullable = false, length = 23)
	public Date getExpirationDate() {
		return this.expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	@Column(name = "TRANSACTION_CODE", nullable = false)
	public String getTransactionCode() {
		return this.transactionCode;
	}

	public void setTransactionCode(String transactionCode) {
		this.transactionCode = transactionCode;
	}

	@Column(name = "TRANSACTION_AMOUNT", nullable = false, precision = 18, scale = 0)
	public long getTransactionAmount() {
		return this.transactionAmount;
	}

	public void setTransactionAmount(long transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "TRANSACTION_DATE", nullable = false, length = 10)
	public Date getTransactionDate() {
		return this.transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	@Temporal(TemporalType.TIME)
	@Column(name = "TRANSACTION_TIME", nullable = false, length = 16)
	public Date getTransactionTime() {
		return this.transactionTime;
	}

	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}

	@Column(name = "KEYED_ENTRY", nullable = false)
	public String getKeyedEntry() {
		return this.keyedEntry;
	}

	public void setKeyedEntry(String keyedEntry) {
		this.keyedEntry = keyedEntry;
	}

	@Column(name = "AUTHORIZATION_NUMBER", unique = true, nullable = false)
	public String getAuthorizationNumber() {
		return this.authorizationNumber;
	}

	public void setAuthorizationNumber(String authorizationNumber) {
		this.authorizationNumber = authorizationNumber;
	}

	@Column(name = "TRANSACTION_DESCRIPTION")
	public String getTransactionDescription() {
		return this.transactionDescription;
	}

	public void setTransactionDescription(String transactionDescription) {
		this.transactionDescription = transactionDescription;
	}

	@Column(name = "BATCH_NUMBER", nullable = false)
	public String getBatchNumber() {
		return this.batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	@Column(name = "ACCOUNT_NUMBER", nullable = false)
	public String getAccountNumber() {
		return this.accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	@Column(name = "CARDTYPE_CODE", nullable = false)
	public String getCardtypeCode() {
		return this.cardtypeCode;
	}

	public void setCardtypeCode(String cardtypeCode) {
		this.cardtypeCode = cardtypeCode;
	}

	@Column(name = "COUNTRY_CODE", nullable = false)
	public String getCountryCode() {
		return this.countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	@Column(name = "FIRST_TWELVE_ACCOUNT_NUMBER", nullable = false)
	public String getFirstTwelveAccountNumber() {
		return this.firstTwelveAccountNumber;
	}

	public void setFirstTwelveAccountNumber(String firstTwelveAccountNumber) {
		this.firstTwelveAccountNumber = firstTwelveAccountNumber;
	}

	@Column(name = "IS_READ", nullable = false)
	public String getIsRead() {
		return this.isRead;
	}

	public void setIsRead(String isRead) {
		this.isRead = isRead;
	}

}
