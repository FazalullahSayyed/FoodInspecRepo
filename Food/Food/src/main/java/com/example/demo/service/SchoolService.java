package com.example.demo.service;

import com.example.demo.model.InspectorSchoolResponse;
import com.example.demo.model.School;
import com.example.demo.repository.SchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    public School createSchool(School school) {
        return schoolRepository.save(school);
    }

    public Optional<School> getSchoolById(Long id) {
        return schoolRepository.findById(id);
    }

    public School updateSchool(Long id, School updatedSchool) {
        return schoolRepository.findById(id).map(school -> {
            school.setName(updatedSchool.getName());
            school.setAddress(updatedSchool.getAddress());
            school.setContactNumber(updatedSchool.getContactNumber());
            school.setEmail(updatedSchool.getEmail());
            school.setType(updatedSchool.getType());
            school.setPrincipalName(updatedSchool.getPrincipalName());
            school.setEstablishedYear(updatedSchool.getEstablishedYear());
            school.setAccreditation(updatedSchool.getAccreditation());
            school.setNotes(updatedSchool.getNotes());
            return schoolRepository.save(school);
        }).orElseThrow(() -> new RuntimeException("School not found"));
    }

    public List<School> getAllSchools() {
        return schoolRepository.findAll();
    }
    public InspectorSchoolResponse getAssignedSchools(Long inspectorId) {
        List<School> schools = schoolRepository.findByInspectorId(inspectorId);
        String message = schools.isEmpty() ? "No schools assigned to you at the moment." : "Schools retrieved successfully.";
        return new InspectorSchoolResponse(schools, message);
    }

    public List<School> getSchoolsForUser(Long userId) {
        return schoolRepository.findSchoolsByUserId(userId);
    }
}
