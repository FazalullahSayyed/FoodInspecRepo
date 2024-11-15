package com.example.demo.controller;

import com.example.demo.model.FoodInspector;
import com.example.demo.repository.FoodInspectorRepository;
import com.example.demo.service.FoodInspectorService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inspectors")
@CrossOrigin
public class FoodInspectorController {
    @Autowired
    private FoodInspectorService foodInspectorService;
    
    @PostMapping("/registerInspector")
    public ResponseEntity<?> registerInspector(@RequestBody FoodInspector inspector) {
        try {
            FoodInspector savedInspector = foodInspectorService.registerInspector(inspector);
            return ResponseEntity.ok(savedInspector);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An unexpected error occurred: " + e.getMessage());
        }
    
    
    }
    @GetMapping("/{id}")
    public ResponseEntity<FoodInspector> getInspectorById(@PathVariable("id") Long inspectorId) {
        return foodInspectorService.findInspectorById(inspectorId)
            .map(inspector -> ResponseEntity.ok().body(inspector))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
