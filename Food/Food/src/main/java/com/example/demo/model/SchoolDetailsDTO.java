package com.example.demo.model;
public class SchoolDetailsDTO {
    private long schoolId;  // Ensure schoolId is of type long
    private String schoolName;
    private String address;
    private String contactNumber;
    private String assignDate;

    // Constructor: Add schoolId here
    public SchoolDetailsDTO(long schoolId, String schoolName, String address, String contactNumber, String assignDate) {
        this.schoolId = schoolId;  // Set schoolId properly
        this.schoolName = schoolName;
        this.address = address;
        this.contactNumber = contactNumber;
        this.assignDate = assignDate;
    }

    // Getters and Setters
    public long getSchoolId() { return schoolId; }
    public void setSchoolId(long schoolId) { this.schoolId = schoolId; }

    public String getSchoolName() { return schoolName; }
    public void setSchoolName(String schoolName) { this.schoolName = schoolName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getAssignDate() { return assignDate; }
    public void setAssignDate(String assignDate) { this.assignDate = assignDate; }
}
