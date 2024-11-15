package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Inspection;
import com.example.demo.service.InspectionService;

@RestController
@RequestMapping("/inspections")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;

    @GetMapping
    public List<Inspection> getAllInspections() {
        return inspectionService.getAllInspections();
    }

    @PostMapping
    public Inspection createInspection(@RequestBody Inspection inspection) {
        return inspectionService.saveInspection(inspection);
    }

    @PutMapping("/{id}")
    public Inspection updateInspection(@PathVariable Long id, @RequestBody Inspection inspection) {
        return inspectionService.updateInspection(id, inspection);
    }

    @DeleteMapping("/{id}")
    public void deleteInspection(@PathVariable Long id) {
        inspectionService.deleteInspection(id);
    }
}
