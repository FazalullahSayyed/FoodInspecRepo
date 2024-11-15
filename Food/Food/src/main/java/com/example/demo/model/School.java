package com.example.demo.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; 
    private String name;
    private String address;
    private String contactNumber;
    private String email;
    private String type;
    private String principalName;
    private Integer establishedYear;
    private String accreditation;
    private String notes;
    private Long inspectorId;
    private String inspectionTableName;
    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Inspec> inspectionForms;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPrincipalName() {
		return principalName;
	}
	public void setPrincipalName(String principalName) {
		this.principalName = principalName;
	}
	public Integer getEstablishedYear() {
		return establishedYear;
	}
	public void setEstablishedYear(Integer establishedYear) {
		this.establishedYear = establishedYear;
	}
	public String getAccreditation() {
		return accreditation;
	}
	public void setAccreditation(String accreditation) {
		this.accreditation = accreditation;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Long getInspectorId() {
		return inspectorId;
	}
	public void setInspectorId(Long inspectorId) {
		this.inspectorId = inspectorId;
	}
	public String getInspectionTableName() {
		return inspectionTableName;
	}
	public void setInspectionTableName(String inspectionTableName) {
		this.inspectionTableName = inspectionTableName;
	}
	public List<Inspec> getInspectionForms() {
		return inspectionForms;
	}
	public void setInspectionForms(List<Inspec> inspectionForms) {
		this.inspectionForms = inspectionForms;
	}
	public School(Long id, User user, String name, String address, String contactNumber, String email, String type,
			String principalName, Integer establishedYear, String accreditation, String notes, Long inspectorId,
			String inspectionTableName, List<Inspec> inspectionForms) {
		super();
		this.id = id;
		this.user = user;
		this.name = name;
		this.address = address;
		this.contactNumber = contactNumber;
		this.email = email;
		this.type = type;
		this.principalName = principalName;
		this.establishedYear = establishedYear;
		this.accreditation = accreditation;
		this.notes = notes;
		this.inspectorId = inspectorId;
		this.inspectionTableName = inspectionTableName;
		this.inspectionForms = inspectionForms;
	}
	public School() {
		super();
	}

    
    
}