package com.example.demo.model;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class CustomMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "s_id")
    private School school;

    @ManyToOne
    @JoinColumn(name = "i_id")
    private FoodInspector inspector;

    private LocalDate assignDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public School getSchool() { return school; }
    public void setSchool(School school) { this.school = school; }

    public FoodInspector getInspector() { return inspector; }
    public void setInspector(FoodInspector inspector) { this.inspector = inspector; }

    public LocalDate getAssignDate() { return assignDate; }
    public void setAssignDate(LocalDate assignDate) { this.assignDate = assignDate; }

    public CustomMapping() { }

    public CustomMapping(Long id, School school, FoodInspector inspector, LocalDate assignDate) {
        this.id = id;
        this.school = school;
        this.inspector = inspector;
        this.assignDate = assignDate;
    }
}
