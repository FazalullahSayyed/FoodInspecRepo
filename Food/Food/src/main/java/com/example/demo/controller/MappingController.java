package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.CustomMapping;
import com.example.demo.model.FoodInspector;
import com.example.demo.model.MapRequest;
import com.example.demo.model.MappingDTO;
import com.example.demo.model.School;
import com.example.demo.model.SchoolDetailsDTO;
import com.example.demo.service.FoodInspectorService;
import com.example.demo.service.MappingService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mappings")
@CrossOrigin
public class MappingController {

    @Autowired
    private MappingService mappingService;
    @Autowired
    private FoodInspectorService foodInspectorService;
    
    // Get all schools
    @GetMapping("/schools")
    public List<School> getAllSchools() {
        return mappingService.getAllSchools();
    }

    // Get all inspectors
    @GetMapping("/inspectors")
    public List<FoodInspector> getAllInspectors() {
        return mappingService.getAllInspectors();
    }

    // Get all mappings
    @GetMapping("/list")
    public List<MappingDTO> getAllMappings() {
        return mappingService.getAllMappings();
    }

    // Create a new mapping
    @PostMapping("/map")
    public CustomMapping createMapping(@RequestBody MapRequest request) {
        LocalDate assignDate = request.getAssignDate();
        return mappingService.mapInspectorToSchool(
                request.getSchoolId(),
                request.getInspectorId(),
                assignDate
        );
    }

    // Update a mapping
    @PutMapping("/{id}")
    public ResponseEntity<CustomMapping> updateMapping(
            @PathVariable Long id,
            @RequestBody MapRequest mappingRequest) {
        CustomMapping updatedMapping = mappingService.updateMapping(
                id,
                mappingRequest.getSchoolId(),
                mappingRequest.getInspectorId(),
                mappingRequest.getAssignDate()
        );
        return ResponseEntity.ok(updatedMapping);
    }

    // Delete a mapping
    @DeleteMapping("/delete/{id}")
    public void deleteMapping(@PathVariable Long id) {
        mappingService.removeMapping(id);
    }
  
//    @GetMapping("/{inspectorId}/schools")
//    public List<School> getSchoolsAssignedToInspector(@PathVariable Long inspectorId) {
//        return mappingService.getSchoolsForInspector(inspectorId);
//    }
    @GetMapping("/{inspectorId}/schools")
    public ResponseEntity<List<SchoolDetailsDTO>> getSchoolDetailsForInspector(@PathVariable Long inspectorId) {
        List<SchoolDetailsDTO> schoolDetails = mappingService.getSchoolDetailsForInspector(inspectorId);
        if (schoolDetails.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no data is found
        }
        return ResponseEntity.ok(schoolDetails); // 200 OK with the list of school details
    }
//    @GetMapping("/getSchoolDetailsForSchool/{schoolId}")
//    public ResponseEntity<List<SchoolDetailsDTO>> getSchoolDetailsForSchool(@PathVariable Long schoolId) {
//        List<SchoolDetailsDTO> schoolDetails = mappingService.getSchoolDetailsForSchool(schoolId);
//        return new ResponseEntity<>(schoolDetails, HttpStatus.OK);
//    }
}
