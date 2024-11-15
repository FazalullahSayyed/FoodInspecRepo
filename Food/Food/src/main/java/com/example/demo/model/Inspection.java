package com.example.demo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Inspection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date inspectionDate;
    private String inspectorName;
    private String inspectionResult;
	public Inspection() {
		
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getInspectionDate() {
		return inspectionDate;
	}
	public void setInspectionDate(Date inspectionDate) {
		this.inspectionDate = inspectionDate;
	}
	public String getInspectorName() {
		return inspectorName;
	}
	public void setInspectorName(String inspectorName) {
		this.inspectorName = inspectorName;
	}
	public String getInspectionResult() {
		return inspectionResult;
	}
	public void setInspectionResult(String inspectionResult) {
		this.inspectionResult = inspectionResult;
	}
	public Inspection(Long id, Date inspectionDate, String inspectorName, String inspectionResult) {
		super();
		this.id = id;
		this.inspectionDate = inspectionDate;
		this.inspectorName = inspectorName;
		this.inspectionResult = inspectionResult;
	}

    
}
