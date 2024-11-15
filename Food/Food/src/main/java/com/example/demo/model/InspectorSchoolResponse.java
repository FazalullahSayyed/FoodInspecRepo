package com.example.demo.model;

import java.util.List;

public class InspectorSchoolResponse {
    private List<School> assignedSchools;
    private String message; // Optional: Add a message for better context

    public InspectorSchoolResponse(List<School> assignedSchools, String message) {
        this.assignedSchools = assignedSchools;
        this.message = message;
    }

    public InspectorSchoolResponse() {
		super();
	}

	// Getters and Setters
    public List<School> getAssignedSchools() {
        return assignedSchools;
    }

    public void setAssignedSchools(List<School> assignedSchools) {
        this.assignedSchools = assignedSchools;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
