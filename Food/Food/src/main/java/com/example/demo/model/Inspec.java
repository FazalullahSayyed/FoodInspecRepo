package com.example.demo.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
@Entity
public class Inspec implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String certificationStatus;
    private String notes;

    private String frontDeskSignature;
    private String kitchenLog;

    // Documents and Information Checkbox Fields
    private boolean staffList;
    private boolean dohInspection;
    private boolean halalMenu;
    private boolean haccpInspection;
    private boolean halalApproved;
    private boolean halalCertification;

    // Meal Times
    
    private String breakfastStart;
    private String breakfastEnd;
    private String lunchStart;
    private String lunchEnd;

    // Student Counts
    private int studentsBreakfast;
    private int studentsLunch;
    private int totalStudents;
    private int halalPercentage;

    private String incident;
    private String remedy;
    private String conclusion;
    private String additionalNotes;
    
   
    private String schoolName;
    private String address;
    private String contactNumber;
    private LocalDate assignDate;
    
    
    
    
    
    
   
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
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
	public LocalDate getAssignDate() {
		return assignDate;
	}
	public void setAssignDate(LocalDate assignDate) {
		this.assignDate = assignDate;
	}

	@Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "file_size")
    private Long fileSize;

    @Lob
    @Column(name = "file_data")
    private byte[] fileData;
    @ElementCollection
    @CollectionTable(name = "inspec_files", joinColumns = @JoinColumn(name = "inspec_id"))
   
    private List<FileData> files;


    @Column(nullable = false)
    private boolean isArchived = false;
    
    
    public boolean isArchived() {
        return isArchived;
    }
    public void setArchived(boolean archived) {
        isArchived = archived;
    }
    
    
    public String getFileName() {
        return fileName;
    }
   
    public List<FileData> getFiles() {
		return files;
	}

	public void setFiles(List<FileData> files) {
		this.files = files;
	}

	
  
	public Inspec(Long id, String type, String certificationStatus, String notes, String frontDeskSignature,
			String kitchenLog, boolean staffList, boolean dohInspection, boolean halalMenu, boolean haccpInspection,
			boolean halalApproved, boolean halalCertification, String breakfastStart, String breakfastEnd,
			String lunchStart, String lunchEnd, int studentsBreakfast, int studentsLunch, int totalStudents,
			int halalPercentage, String incident, String remedy, String conclusion, String additionalNotes,
			 String schoolName, String address, String contactNumber, LocalDate assignDate,
			String fileName, String fileType, Long fileSize, byte[] fileData, List<FileData> files, boolean isArchived,
			School school, User user) {
		super();
		this.id = id;
		this.type = type;
		this.certificationStatus = certificationStatus;
		this.notes = notes;
		this.frontDeskSignature = frontDeskSignature;
		this.kitchenLog = kitchenLog;
		this.staffList = staffList;
		this.dohInspection = dohInspection;
		this.halalMenu = halalMenu;
		this.haccpInspection = haccpInspection;
		this.halalApproved = halalApproved;
		this.halalCertification = halalCertification;
		this.breakfastStart = breakfastStart;
		this.breakfastEnd = breakfastEnd;
		this.lunchStart = lunchStart;
		this.lunchEnd = lunchEnd;
		this.studentsBreakfast = studentsBreakfast;
		this.studentsLunch = studentsLunch;
		this.totalStudents = totalStudents;
		this.halalPercentage = halalPercentage;
		this.incident = incident;
		this.remedy = remedy;
		this.conclusion = conclusion;
		this.additionalNotes = additionalNotes;
		
		this.schoolName = schoolName;
		this.address = address;
		this.contactNumber = contactNumber;
		this.assignDate = assignDate;
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.fileData = fileData;
		this.files = files;
		this.isArchived = isArchived;
		this.school = school;
		this.user = user;
	}
	public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    @ManyToOne
    @JoinColumn(name = "school_id", referencedColumnName = "id")
    @JsonBackReference
    private School school;  // Field for School, not schoolId
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;  // Field for User, not userId
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getCertificationStatus() {
		return certificationStatus;
	}
	public void setCertificationStatus(String certificationStatus) {
		this.certificationStatus = certificationStatus;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getFrontDeskSignature() {
		return frontDeskSignature;
	}
	public void setFrontDeskSignature(String frontDeskSignature) {
		this.frontDeskSignature = frontDeskSignature;
	}
	public String getKitchenLog() {
		return kitchenLog;
	}
	public void setKitchenLog(String kitchenLog) {
		this.kitchenLog = kitchenLog;
	}
	public boolean isStaffList() {
		return staffList;
	}
	public void setStaffList(boolean staffList) {
		this.staffList = staffList;
	}
	public boolean isDohInspection() {
		return dohInspection;
	}
	public void setDohInspection(boolean dohInspection) {
		this.dohInspection = dohInspection;
	}
	public boolean isHalalMenu() {
		return halalMenu;
	}
	public void setHalalMenu(boolean halalMenu) {
		this.halalMenu = halalMenu;
	}
	public boolean isHaccpInspection() {
		return haccpInspection;
	}
	public void setHaccpInspection(boolean haccpInspection) {
		this.haccpInspection = haccpInspection;
	}
	public boolean isHalalApproved() {
		return halalApproved;
	}
	public void setHalalApproved(boolean halalApproved) {
		this.halalApproved = halalApproved;
	}
	public boolean isHalalCertification() {
		return halalCertification;
	}
	public void setHalalCertification(boolean halalCertification) {
		this.halalCertification = halalCertification;
	}
	public String getBreakfastStart() {
		return breakfastStart;
	}
	public void setBreakfastStart(String breakfastStart) {
		this.breakfastStart = breakfastStart;
	}
	public String getBreakfastEnd() {
		return breakfastEnd;
	}
	public void setBreakfastEnd(String breakfastEnd) {
		this.breakfastEnd = breakfastEnd;
	}
	public String getLunchStart() {
		return lunchStart;
	}
	public void setLunchStart(String lunchStart) {
		this.lunchStart = lunchStart;
	}
	public String getLunchEnd() {
		return lunchEnd;
	}
	public void setLunchEnd(String lunchEnd) {
		this.lunchEnd = lunchEnd;
	}
	public int getStudentsBreakfast() {
		return studentsBreakfast;
	}
	public void setStudentsBreakfast(int studentsBreakfast) {
		this.studentsBreakfast = studentsBreakfast;
	}
	public int getStudentsLunch() {
		return studentsLunch;
	}
	public void setStudentsLunch(int studentsLunch) {
		this.studentsLunch = studentsLunch;
	}
	public int getTotalStudents() {
		return totalStudents;
	}
	public void setTotalStudents(int totalStudents) {
		this.totalStudents = totalStudents;
	}
	public int getHalalPercentage() {
		return halalPercentage;
	}
	public void setHalalPercentage(int halalPercentage) {
		this.halalPercentage = halalPercentage;
	}
	public String getIncident() {
		return incident;
	}
	public void setIncident(String incident) {
		this.incident = incident;
	}
	public String getRemedy() {
		return remedy;
	}
	public void setRemedy(String remedy) {
		this.remedy = remedy;
	}
	public String getConclusion() {
		return conclusion;
	}
	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}
	public String getAdditionalNotes() {
		return additionalNotes;
	}
	public void setAdditionalNotes(String additionalNotes) {
		this.additionalNotes = additionalNotes;
	}
	public School getSchool() {
		return school;
	}
	public void setSchool(School school) {
		this.school = school;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public Inspec() {
		super();
	}
    
    
    
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User assignedUser;
//    @Column(nullable = false, unique = true)
//    private String schoolUserKey;

	

    
    
}
