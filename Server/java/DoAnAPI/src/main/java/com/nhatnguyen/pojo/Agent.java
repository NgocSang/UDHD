package com.nhatnguyen.pojo;
// Generated Dec 4, 2016 9:17:20 PM by Hibernate Tools 3.6.0.Final

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Agent generated by hbm2java
 */
@Entity
@Table(name = "AGENT")
public class Agent implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7577254382567018196L;
	private String agentNumber;
	private Processor processor;
	private String agentName;
	private String agentTelephone1;
	private String agentTelephone2;
	private String agentTelephone3;
	private String agentCity;
	private String agentDistrict;
	private String agentStreet;
	private String agentStreetNumber;
	private String agentRegion;
	private String agentOwner;
	private String agentFax;
	private String agentEmail1;
	private String agentEmail2;
	private String agentEmail3;
	private String agentBankAccount;
	private String agentStatus;
	private Date agentAppr0veDate;
	private Date agentFirstDateActivate;
	private Date agentLastDayActivate;
	private Set<Merchant> merchants = new HashSet<Merchant>(0);

	public Agent() {
	}

	public Agent(String agentNumber, Processor processor, String agentName, String agentTelephone1, String agentCity,
			String agentDistrict, String agentStreet, String agentStreetNumber, String agentRegion, String agentOwner,
			String agentFax, String agentEmail1, String agentBankAccount, String agentStatus, Date agentAppr0veDate) {
		this.agentNumber = agentNumber;
		this.processor = processor;
		this.agentName = agentName;
		this.agentTelephone1 = agentTelephone1;
		this.agentCity = agentCity;
		this.agentDistrict = agentDistrict;
		this.agentStreet = agentStreet;
		this.agentStreetNumber = agentStreetNumber;
		this.agentRegion = agentRegion;
		this.agentOwner = agentOwner;
		this.agentFax = agentFax;
		this.agentEmail1 = agentEmail1;
		this.agentBankAccount = agentBankAccount;
		this.agentStatus = agentStatus;
		this.agentAppr0veDate = agentAppr0veDate;
	}

	public Agent(String agentNumber, Processor processor, String agentName, String agentTelephone1,
			String agentTelephone2, String agentTelephone3, String agentCity, String agentDistrict, String agentStreet,
			String agentStreetNumber, String agentRegion, String agentOwner, String agentFax, String agentEmail1,
			String agentEmail2, String agentEmail3, String agentBankAccount, String agentStatus, Date agentAppr0veDate,
			Date agentFirstDateActivate, Date agentLastDayActivate, Set<Merchant> merchants) {
		this.agentNumber = agentNumber;
		this.processor = processor;
		this.agentName = agentName;
		this.agentTelephone1 = agentTelephone1;
		this.agentTelephone2 = agentTelephone2;
		this.agentTelephone3 = agentTelephone3;
		this.agentCity = agentCity;
		this.agentDistrict = agentDistrict;
		this.agentStreet = agentStreet;
		this.agentStreetNumber = agentStreetNumber;
		this.agentRegion = agentRegion;
		this.agentOwner = agentOwner;
		this.agentFax = agentFax;
		this.agentEmail1 = agentEmail1;
		this.agentEmail2 = agentEmail2;
		this.agentEmail3 = agentEmail3;
		this.agentBankAccount = agentBankAccount;
		this.agentStatus = agentStatus;
		this.agentAppr0veDate = agentAppr0veDate;
		this.agentFirstDateActivate = agentFirstDateActivate;
		this.agentLastDayActivate = agentLastDayActivate;
		this.merchants = merchants;
	}

	@Id

	@Column(name = "AGENT_NUMBER", unique = true, nullable = false)
	public String getAgentNumber() {
		return this.agentNumber;
	}

	public void setAgentNumber(String agentNumber) {
		this.agentNumber = agentNumber;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BACKEND_PROCESSOR", nullable = false)
	public Processor getProcessor() {
		return this.processor;
	}

	public void setProcessor(Processor processor) {
		this.processor = processor;
	}

	@Column(name = "AGENT_NAME", nullable = false)
	public String getAgentName() {
		return this.agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	@Column(name = "AGENT_TELEPHONE1", nullable = false)
	public String getAgentTelephone1() {
		return this.agentTelephone1;
	}

	public void setAgentTelephone1(String agentTelephone1) {
		this.agentTelephone1 = agentTelephone1;
	}

	@Column(name = "AGENT_TELEPHONE2")
	public String getAgentTelephone2() {
		return this.agentTelephone2;
	}

	public void setAgentTelephone2(String agentTelephone2) {
		this.agentTelephone2 = agentTelephone2;
	}

	@Column(name = "AGENT_TELEPHONE3")
	public String getAgentTelephone3() {
		return this.agentTelephone3;
	}

	public void setAgentTelephone3(String agentTelephone3) {
		this.agentTelephone3 = agentTelephone3;
	}

	@Column(name = "AGENT_CITY", nullable = false)
	public String getAgentCity() {
		return this.agentCity;
	}

	public void setAgentCity(String agentCity) {
		this.agentCity = agentCity;
	}

	@Column(name = "AGENT_DISTRICT", nullable = false)
	public String getAgentDistrict() {
		return this.agentDistrict;
	}

	public void setAgentDistrict(String agentDistrict) {
		this.agentDistrict = agentDistrict;
	}

	@Column(name = "AGENT_STREET", nullable = false)
	public String getAgentStreet() {
		return this.agentStreet;
	}

	public void setAgentStreet(String agentStreet) {
		this.agentStreet = agentStreet;
	}

	@Column(name = "AGENT_STREET_NUMBER", nullable = false)
	public String getAgentStreetNumber() {
		return this.agentStreetNumber;
	}

	public void setAgentStreetNumber(String agentStreetNumber) {
		this.agentStreetNumber = agentStreetNumber;
	}

	@Column(name = "AGENT_REGION", nullable = false)
	public String getAgentRegion() {
		return this.agentRegion;
	}

	public void setAgentRegion(String agentRegion) {
		this.agentRegion = agentRegion;
	}

	@Column(name = "AGENT_OWNER", nullable = false)
	public String getAgentOwner() {
		return this.agentOwner;
	}

	public void setAgentOwner(String agentOwner) {
		this.agentOwner = agentOwner;
	}

	@Column(name = "AGENT_FAX", nullable = false)
	public String getAgentFax() {
		return this.agentFax;
	}

	public void setAgentFax(String agentFax) {
		this.agentFax = agentFax;
	}

	@Column(name = "AGENT_EMAIL_1", nullable = false)
	public String getAgentEmail1() {
		return this.agentEmail1;
	}

	public void setAgentEmail1(String agentEmail1) {
		this.agentEmail1 = agentEmail1;
	}

	@Column(name = "AGENT_EMAIL_2")
	public String getAgentEmail2() {
		return this.agentEmail2;
	}

	public void setAgentEmail2(String agentEmail2) {
		this.agentEmail2 = agentEmail2;
	}

	@Column(name = "AGENT_EMAIL_3")
	public String getAgentEmail3() {
		return this.agentEmail3;
	}

	public void setAgentEmail3(String agentEmail3) {
		this.agentEmail3 = agentEmail3;
	}

	@Column(name = "AGENT_BANK_ACCOUNT", nullable = false)
	public String getAgentBankAccount() {
		return this.agentBankAccount;
	}

	public void setAgentBankAccount(String agentBankAccount) {
		this.agentBankAccount = agentBankAccount;
	}

	@Column(name = "AGENT_STATUS", nullable = false)
	public String getAgentStatus() {
		return this.agentStatus;
	}

	public void setAgentStatus(String agentStatus) {
		this.agentStatus = agentStatus;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AGENT_APPR0VE_DATE", nullable = false, length = 23)
	public Date getAgentAppr0veDate() {
		return this.agentAppr0veDate;
	}

	public void setAgentAppr0veDate(Date agentAppr0veDate) {
		this.agentAppr0veDate = agentAppr0veDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AGENT_FIRST_DATE_ACTIVATE", length = 23)
	public Date getAgentFirstDateActivate() {
		return this.agentFirstDateActivate;
	}

	public void setAgentFirstDateActivate(Date agentFirstDateActivate) {
		this.agentFirstDateActivate = agentFirstDateActivate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AGENT_LAST_DAY_ACTIVATE", length = 23)
	public Date getAgentLastDayActivate() {
		return this.agentLastDayActivate;
	}

	public void setAgentLastDayActivate(Date agentLastDayActivate) {
		this.agentLastDayActivate = agentLastDayActivate;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "agent")
	public Set<Merchant> getMerchants() {
		return this.merchants;
	}

	public void setMerchants(Set<Merchant> merchants) {
		this.merchants = merchants;
	}

}