package com.example.demo.controller;

import com.example.demo.model.Inspec;
import com.example.demo.service.InspecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/inspecs")
public class InspecController {

    private static final Logger LOGGER = Logger.getLogger(InspecController.class.getName());

    @Autowired
    private InspecService inspecService;

//    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Inspec> createInspec(
//            @RequestParam("inspectorId") Long inspectorId,
//            @RequestParam("schoolId") Long schoolId,
//            @RequestPart("file") MultipartFile file,
//            @RequestPart("inspec") Inspec inspec) {
//
//        try {
//            Inspec savedInspec = inspecService.createInspec(inspec, inspectorId, schoolId, file);
//            return ResponseEntity.ok(savedInspec);
//        } catch (RuntimeException | IOException e) {
//            LOGGER.log(Level.SEVERE, "Failed to create Inspec", e);
//            return ResponseEntity.status(500).build();
//        }
//    }
    
//    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Inspec> createInspec(
//            @RequestParam("inspectorId") Long inspectorId,
//            @RequestParam("schoolId") Long schoolId,
//            @RequestPart("files") List<MultipartFile> files, // Accept multiple files
//            @RequestPart("inspec") Inspec inspec) {
//
//        try {
//            Inspec savedInspec = inspecService.createInspec(inspec, inspectorId, schoolId, files);
//            return ResponseEntity.ok(savedInspec);
//        } catch (RuntimeException | IOException e) {
//            LOGGER.log(Level.SEVERE, "Failed to create Inspec", e);
//            return ResponseEntity.status(500).build();
//        }
//    }
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Inspec> createInspec(
            @RequestParam("inspectorId") Long inspectorId,
            @RequestParam("schoolId") Long schoolId,
            @RequestPart("files") List<MultipartFile> files,  // Accept multiple files
            @RequestPart("inspec") Inspec inspec) {

        try {
            Inspec savedInspec = inspecService.createInspec(inspec, inspectorId, schoolId, files);
            return ResponseEntity.ok(savedInspec);
        } catch (RuntimeException | IOException e) {
            LOGGER.log(Level.SEVERE, "Failed to create Inspec", e);
            return ResponseEntity.status(500).build();
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<Inspec>> getAllInspecs() {
        List<Inspec> inspecs = inspecService.getAllInspecs();
        return ResponseEntity.ok(inspecs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inspec> getInspecById(@PathVariable Long id) {
        Optional<Inspec> inspec = inspecService.getInspecById(id);
        return inspec.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInspec(@PathVariable Long id) {
        Optional<Inspec> inspec = inspecService.getInspecById(id);
        if (inspec.isPresent()) {
            inspecService.deleteInspecById(id);
            return ResponseEntity.noContent().build();
        } else {
            LOGGER.warning("Attempt to delete non-existent Inspec with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/{schoolId}")
    public ResponseEntity<List<Inspec>> getAllInspecsByUserAndSchool(
            @PathVariable Long userId, @PathVariable Long schoolId) {
        
        try {
            List<Inspec> inspecs = inspecService.getAllInspecsByUserAndSchool(userId, schoolId);
            return ResponseEntity.ok(inspecs);
        } catch (RuntimeException e) {
            LOGGER.log(Level.SEVERE, "Failed to retrieve Inspecs by user and school", e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        Optional<Inspec> inspecOpt = inspecService.getInspecById(id);

        if (inspecOpt.isPresent()) {
            Inspec inspec = inspecOpt.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(inspec.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + inspec.getFileName() + "\"")
                    .body(inspec.getFileData());
        } else {
            LOGGER.warning("Attempt to download non-existent file for Inspec with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/deleteByUserAndSchool")
    public ResponseEntity<Void> deleteInspectionsByUserAndSchool(
            @RequestParam("userId") Long userId, 
            @RequestParam("schoolId") Long schoolId) {
        try {
            inspecService.deleteInspectionsByUserAndSchool(userId, schoolId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            LOGGER.log(Level.SEVERE, "Failed to delete inspections by user and school", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/archiveByUserAndSchool")
    public ResponseEntity<Void> archiveInspectionsByUserAndSchool(
            @RequestParam("userId") Long userId,
            @RequestParam("schoolId") Long schoolId) {
        try {
            inspecService.archiveInspectionsByUserAndSchool(userId, schoolId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            LOGGER.log(Level.SEVERE, "Failed to archive inspections by user and school", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get all inspections (including archived)
     */
    
    /**
     * Get all active inspections (not archived)
     */
    @GetMapping("/active")
    public ResponseEntity<List<Inspec>> getAllActiveInspecs() {
        List<Inspec> inspecs = inspecService.getAllActiveInspecs();
        return ResponseEntity.ok(inspecs);
    }

    /**
     * Get a specific inspection by ID if it is active (not archived)
     */
    @GetMapping("/active/{id}")
    public ResponseEntity<Inspec> getActiveInspecById(@PathVariable Long id) {
        Optional<Inspec> inspecOpt = inspecService.getActiveInspecById(id);

        return inspecOpt.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    LOGGER.warning("Attempt to access a non-existent or archived Inspec with ID: " + id);
                    return ResponseEntity.notFound().build();
                });
    }

    /**
     * Get all active inspections by user and school ID
     */
    @GetMapping("/active/byUserAndSchool")
    public ResponseEntity<List<Inspec>> getAllActiveInspecsByUserAndSchool(
            @RequestParam("userId") Long userId, 
            @RequestParam("schoolId") Long schoolId) {
        try {
            List<Inspec> inspecs = inspecService.getAllActiveInspecsByUserAndSchool(userId, schoolId);
            return ResponseEntity.ok(inspecs);
        } catch (RuntimeException e) {
            LOGGER.log(Level.SEVERE, "Failed to retrieve Inspecs by user and school", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
