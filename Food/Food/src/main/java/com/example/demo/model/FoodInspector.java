package com.example.demo.model;

import javax.persistence.*;
import java.security.SecureRandom;
import java.time.LocalDate;

@Entity
public class FoodInspector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String location;
    private String phoneNumber;
    private String role;
    private LocalDate inspectionDate;

  
    public static String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }

	public Long getid() {
		return id;
	}

	public void setid(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public LocalDate getInspectionDate() {
		return inspectionDate;
	}

	public void setInspectionDate(LocalDate inspectionDate) {
		this.inspectionDate = inspectionDate;
	}

	public FoodInspector(Long id, String name, String email, String location, String phoneNumber, String role,
			LocalDate inspectionDate) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.location = location;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.inspectionDate = inspectionDate;
	}

	public FoodInspector() {
		
	}

}
