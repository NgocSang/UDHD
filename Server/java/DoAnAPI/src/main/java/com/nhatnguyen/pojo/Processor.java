package com.nhatnguyen.pojo;
// Generated Dec 4, 2016 9:17:20 PM by Hibernate Tools 3.6.0.Final

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Processor generated by hbm2java
 */
@Entity
@Table(name = "PROCESSOR")
public class Processor implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 486678519979025234L;
	private String processorId;
	private String processorAddress;
	private String processorBankAccount;
	private Set<Agent> agents = new HashSet<Agent>(0);
	private Set<Merchant> merchants = new HashSet<Merchant>(0);

	public Processor() {
	}

	public Processor(String processorId, String processorAddress, String processorBankAccount) {
		this.processorId = processorId;
		this.processorAddress = processorAddress;
		this.processorBankAccount = processorBankAccount;
	}

	public Processor(String processorId, String processorAddress, String processorBankAccount, Set<Agent> agents,
			Set<Merchant> merchants) {
		this.processorId = processorId;
		this.processorAddress = processorAddress;
		this.processorBankAccount = processorBankAccount;
		this.agents = agents;
		this.merchants = merchants;
	}

	@Id

	@Column(name = "PROCESSOR_ID", unique = true, nullable = false)
	public String getProcessorId() {
		return this.processorId;
	}

	public void setProcessorId(String processorId) {
		this.processorId = processorId;
	}

	@Column(name = "PROCESSOR_ADDRESS", nullable = false)
	public String getProcessorAddress() {
		return this.processorAddress;
	}

	public void setProcessorAddress(String processorAddress) {
		this.processorAddress = processorAddress;
	}

	@Column(name = "PROCESSOR_BANK_ACCOUNT", nullable = false)
	public String getProcessorBankAccount() {
		return this.processorBankAccount;
	}

	public void setProcessorBankAccount(String processorBankAccount) {
		this.processorBankAccount = processorBankAccount;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "processor")
	public Set<Agent> getAgents() {
		return this.agents;
	}

	public void setAgents(Set<Agent> agents) {
		this.agents = agents;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "processor")
	public Set<Merchant> getMerchants() {
		return this.merchants;
	}

	public void setMerchants(Set<Merchant> merchants) {
		this.merchants = merchants;
	}

}