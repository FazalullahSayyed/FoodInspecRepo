package com.example.demo.model;
import javax.persistence.Embeddable;
import javax.persistence.Lob;

@Embeddable
public class FileData {
    private String fileName;
    private String fileType;
    private Long fileSize;
    
    @Lob
    private byte[] fileData;

	public String getFileName() {
		return fileName;
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

	public FileData(String fileName, String fileType, Long fileSize, byte[] fileData) {
		super();
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.fileData = fileData;
	}

	public FileData() {
		super();
	}
    

    // Getters and Setters
}
