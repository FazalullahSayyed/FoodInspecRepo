package com.example.demo.controller;

import com.example.demo.model.School;
import com.example.demo.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inspector")
@CrossOrigin
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @PostMapping
    public ResponseEntity<School> createSchool(@RequestBody School school) {
        School createdSchool = schoolService.createSchool(school);
        return ResponseEntity.ok(createdSchool);
    }

    @GetMapping("/{id}")
    public ResponseEntity<School> getSchoolById(@PathVariable Long id) {
        Optional<School> school = schoolService.getSchoolById(id);
        return school.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<School> updateSchool(@PathVariable Long id, @RequestBody School school) {
        School updatedSchool = schoolService.updateSchool(id, school);
        return ResponseEntity.ok(updatedSchool);
    }

    @GetMapping
    public ResponseEntity<List<School>> getAllSchools() {
        List<School> schools = schoolService.getAllSchools();
        return ResponseEntity.ok(schools);
    }
    @GetMapping("/user/{userId}/schools")
    public ResponseEntity<List<School>> getSchoolsForUser(@PathVariable Long userId) {
        List<School> schools = schoolService.getSchoolsForUser(userId);
        if (schools.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(schools);
    }
    

}
