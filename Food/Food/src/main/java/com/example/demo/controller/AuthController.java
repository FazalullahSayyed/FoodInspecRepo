package com.example.demo.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.jwt.JwtTokenUtil;
import com.example.demo.model.InspectorSchoolResponse;
import com.example.demo.model.School;
import com.example.demo.model.User;
import com.example.demo.repository.SchoolRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
@RequestMapping
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        // Fetch user from DB using email
        User user = userRepository.findByEmail(loginRequest.getEmail());

        // If user is not found
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // Use the same password as in the database
        String storedPassword = user.getPassword();

        // Check if the input password matches the stored password
        if (!loginRequest.getPassword().equals(storedPassword)) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // If authentication is successful, generate token
        String token = jwtTokenUtil.generateToken(user.getEmail(), user.getRole(), user.getId());

        return ResponseEntity.ok(token);
    }

//    @GetMapping("inspector/{inspectorId}/schools")
//    public List<School> getAssignedSchools(@PathVariable Long inspectorId, @RequestHeader("Authorization") String token) throws AccessDeniedException {
//        String jwt = token.substring(7); // Assumes "Bearer " is 7 characters long
//        Long extractedInspectorId = jwtTokenUtil.extractInspectorId(jwt);
//
//        // Check if the inspectorId from the URL matches the one extracted from the token
//        if (!inspectorId.equals(extractedInspectorId)) {
//            throw new AccessDeniedException("Insufficient permissions");
//        }
//
//        return schoolRepository.findSchoolsByUserId(inspectorId);
//    }

    
    @GetMapping("inspector/{inspectorId}/schools")
    public InspectorSchoolResponse getAssignedSchools(@PathVariable Long inspectorId, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        Long extractedInspectorId = jwtTokenUtil.extractInspectorId(jwt);
        
        List<School> schools = schoolRepository.findSchoolsByUserId(inspectorId);
        
        if (schools.isEmpty()) {
            return new InspectorSchoolResponse(schools, "No schools assigned to you at the moment.");
        }
        return new InspectorSchoolResponse(schools, "Schools retrieved successfully.");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
