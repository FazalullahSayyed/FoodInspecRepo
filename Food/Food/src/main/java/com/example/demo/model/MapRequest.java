package com.example.demo.model;

import java.time.LocalDate;

public class MapRequest {
    private Long schoolId;
    private Long inspectorId;
    private LocalDate assignDate;

    // Getters and Setters
    public Long getSchoolId() { return schoolId; }
    public void setSchoolId(Long schoolId) { this.schoolId = schoolId; }

    public Long getInspectorId() { return inspectorId; }
    public void setInspectorId(Long inspectorId) { this.inspectorId = inspectorId; }

    public LocalDate getAssignDate() { return assignDate; }
    public void setAssignDate(LocalDate assignDate) { this.assignDate = assignDate; }
	public MapRequest(Long schoolId, Long inspectorId, LocalDate assignDate) {
		super();
		this.schoolId = schoolId;
		this.inspectorId = inspectorId;
		this.assignDate = assignDate;
	}
	public MapRequest() {
		super();
	}
	
    
}
