package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.CustomMapping;
import com.example.demo.model.FoodInspector;
import com.example.demo.model.MappingDTO;
import com.example.demo.model.School;
import com.example.demo.model.SchoolDetailsDTO;
import com.example.demo.repository.FoodInspectorRepository;
import com.example.demo.repository.MappingRepository;
import com.example.demo.repository.SchoolRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MappingService {

	
	
    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private MappingRepository mappingRepository;

    @Autowired
    private FoodInspectorRepository foodInspectorRepository;

    // Get all schools
    public List<School> getAllSchools() {
        return schoolRepository.findAll();
    }

    // Get all inspectors
    public List<FoodInspector> getAllInspectors() {
        return foodInspectorRepository.findAll();
    }

    // Create mapping between School and FoodInspector
    public CustomMapping mapInspectorToSchool(Long schoolId, Long inspectorId, LocalDate assignDate) {
        Optional<School> school = schoolRepository.findById(schoolId);
        Optional<FoodInspector> inspector = foodInspectorRepository.findById(inspectorId);

        if (school.isPresent() && inspector.isPresent()) {
            CustomMapping mapping = new CustomMapping();
            mapping.setSchool(school.get());
            mapping.setInspector(inspector.get());
            mapping.setAssignDate(assignDate);
            return mappingRepository.save(mapping);
        }
        throw new RuntimeException("School or Inspector not found");
    }

    // Get all mappings
    public List<MappingDTO> getAllMappings() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<CustomMapping> mappings = mappingRepository.findAll();

        return mappings.stream().map(mapping -> {
            String assignDate = mapping.getAssignDate() != null ? mapping.getAssignDate().format(formatter) : null;
            return new MappingDTO(
                    mapping.getId(),
                    mapping.getSchool().getName(),
                    assignDate,
                    mapping.getInspector().getName()
            );
        }).collect(Collectors.toList());
    }

    // Update mapping
    public CustomMapping updateMapping(Long mappingId, Long schoolId, Long inspectorId, LocalDate assignDate) {
        Optional<CustomMapping> existingMapping = mappingRepository.findById(mappingId);

        if (existingMapping.isPresent()) {
            CustomMapping mapping = existingMapping.get();
            mapping.setSchool(schoolRepository.findById(schoolId).orElseThrow(() -> new RuntimeException("School not found")));
            mapping.setInspector(foodInspectorRepository.findById(inspectorId).orElseThrow(() -> new RuntimeException("Inspector not found")));
            mapping.setAssignDate(assignDate);
            return mappingRepository.save(mapping);
        }
        throw new RuntimeException("Mapping not found");
    }

    // Remove mapping
    public void removeMapping(Long mappingId) {
        mappingRepository.deleteById(mappingId);
    }
    public List<School> getSchoolsForInspector(Long inspectorId) {
        List<CustomMapping> mappings = mappingRepository.findByInspector_Id(inspectorId);
        return mappings.stream()
                       .map(CustomMapping::getSchool)
                       .collect(Collectors.toList());
    }
    public List<SchoolDetailsDTO> getSchoolDetailsForInspector(Long inspectorId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<CustomMapping> mappings = mappingRepository.findByInspector_Id(inspectorId);

        return mappings.stream().map(mapping -> {
            String assignDate = mapping.getAssignDate() != null ? mapping.getAssignDate().format(formatter) : "Not Assigned";
            School school = mapping.getSchool();  // Get the associated School entity

            // Ensure you're passing the schoolId, schoolName, address, contactNumber, and assignDate
            return new SchoolDetailsDTO(
                    school.getId(),       // Set the schoolId here
                    school.getName(),     // schoolName
                    school.getAddress(),  // address
                    school.getContactNumber(), // contactNumber
                    assignDate            // assignDate
            );
        }).collect(Collectors.toList());
    }
//    public List<SchoolDetailsDTO> getSchoolDetailsForSchool(Long schoolId) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        // Assuming you are querying CustomMapping to get the assignDate
//        List<CustomMapping> mappings = mappingRepository.findBySchool_Id(schoolId); // This can return multiple results
//
//        // Transform the mappings to SchoolDetailsDTO
//        return mappings.stream().map(mapping -> {
//            String assignDate = mapping.getAssignDate() != null ? mapping.getAssignDate().format(formatter) : "N/A";
//            School school = mapping.getSchool();  // Get associated school
//
//            // Return a SchoolDetailsDTO for each mapping
//            return new SchoolDetailsDTO(
//                    school.getId(),       // Set the schoolId here
//                    school.getName(),     // schoolName
//                    school.getAddress(),  // address
//                    school.getContactNumber(), // contactNumber
//                    assignDate            // assignDate from CustomMapping
//            );
//        }).collect(Collectors.toList());
//    }
//


    
}
