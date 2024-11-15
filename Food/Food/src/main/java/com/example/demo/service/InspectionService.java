package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Inspection;
import com.example.demo.repository.InspectionRepository;

@Service
public class InspectionService {

    @Autowired
    private InspectionRepository inspectionRepository;

    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }

    public Inspection saveInspection(Inspection inspection) {
        return inspectionRepository.save(inspection);
    }
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    public Inspection updateInspection(Long id, Inspection updatedInspection) {
        // Find the existing inspection by ID, or throw a ResourceNotFoundException if not found
        Inspection existingInspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection not found"));

        // Update fields of the existing inspection
        existingInspection.setInspectionDate(updatedInspection.getInspectionDate());
        existingInspection.setInspectorName(updatedInspection.getInspectorName());
        existingInspection.setInspectionResult(updatedInspection.getInspectionResult());

        // Save and return the updated inspection
        return inspectionRepository.save(existingInspection);
    }
   
    public void deleteInspection(Long id) {
        inspectionRepository.deleteById(id);
    }
}
