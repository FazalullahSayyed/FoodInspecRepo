package com.example.demo.model;

public class MappingDTO {
    private Long id;
    private String schoolName;
    private String assignDate;
    private String inspectorName;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSchoolName() { return schoolName; }
    public void setSchoolName(String schoolName) { this.schoolName = schoolName; }

    public String getAssignDate() { return assignDate; }
    public void setAssignDate(String assignDate) { this.assignDate = assignDate; }

    public String getInspectorName() { return inspectorName; }
    public void setInspectorName(String inspectorName) { this.inspectorName = inspectorName; }

    public MappingDTO(Long id, String schoolName, String assignDate, String inspectorName) {
        this.id = id;
        this.schoolName = schoolName;
        this.assignDate = assignDate;
        this.inspectorName = inspectorName;
    }

    public MappingDTO() { super();}
}
