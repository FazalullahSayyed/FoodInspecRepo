package com.example.demo.service;

import com.example.demo.model.FileData;
import com.example.demo.model.Inspec;
import com.example.demo.model.School;
import com.example.demo.model.User;
import com.example.demo.repository.InspecRepository;
import com.example.demo.repository.SchoolRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class InspecService {

    private static final Logger LOGGER = Logger.getLogger(InspecService.class.getName());

    @Autowired
    private InspecRepository inspecRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private UserRepository userRepository;

//    public Inspec createInspec(Inspec inspec, Long inspectorId, Long schoolId, MultipartFile file) throws IOException {
//        Optional<User> userOpt = userRepository.findById(inspectorId);
//        Optional<School> schoolOpt = schoolRepository.findById(schoolId);
//
//        if (userOpt.isPresent() && schoolOpt.isPresent()) {
//            inspec.setUser(userOpt.get());
//            inspec.setSchool(schoolOpt.get());
//            
//            if (file != null) {
//                inspec.setFileName(file.getOriginalFilename());
//                inspec.setFileType(file.getContentType());
//                inspec.setFileSize(file.getSize());
//                inspec.setFileData(file.getBytes());
//            }
//            
//            Inspec savedInspec = inspecRepository.save(inspec);
//            LOGGER.info("Inspec created with ID: " + savedInspec.getId());
//            return savedInspec;
//        } else {
//            String errorMessage = "User or School not found with ID - User: " + inspectorId + ", School: " + schoolId;
//            LOGGER.severe(errorMessage);
//            throw new RuntimeException(errorMessage);
//        }
//    }
    
    
//    public Inspec createInspec(Inspec inspec, Long inspectorId, Long schoolId, List<MultipartFile> files) throws IOException {
//        Optional<User> userOpt = userRepository.findById(inspectorId);
//        Optional<School> schoolOpt = schoolRepository.findById(schoolId);
//
//        if (userOpt.isPresent() && schoolOpt.isPresent()) {
//            inspec.setUser(userOpt.get());
//            inspec.setSchool(schoolOpt.get());
//
//            // Save file details for each uploaded file
//            for (MultipartFile file : files) {
//                Inspec fileRecord = new Inspec();
//                fileRecord.setFileName(file.getOriginalFilename());
//                fileRecord.setFileType(file.getContentType());
//                fileRecord.setFileSize(file.getSize());
//                fileRecord.setFileData(file.getBytes());
//                inspecRepository.save(fileRecord);
//            }
//            LOGGER.info("Inspec created with files: " + files.stream().map(MultipartFile::getOriginalFilename).toList());
//            return inspec;
//        } else {
//            String errorMessage = "User or School not found with ID - User: " + inspectorId + ", School: " + schoolId;
//            LOGGER.severe(errorMessage);
//            throw new RuntimeException(errorMessage);
//        }
//    }
    public Inspec createInspec(Inspec inspec, Long inspectorId, Long schoolId, List<MultipartFile> files) throws IOException {
        Optional<User> userOpt = userRepository.findById(inspectorId);
        Optional<School> schoolOpt = schoolRepository.findById(schoolId);

        if (userOpt.isPresent() && schoolOpt.isPresent()) {
//        	inspec.setId(null);
            inspec.setUser(userOpt.get());
            inspec.setSchool(schoolOpt.get());

            List<FileData> fileDataList = new ArrayList<>();
            for (MultipartFile file : files) {
                FileData fileData = new FileData();
                fileData.setFileName(file.getOriginalFilename());
                fileData.setFileType(file.getContentType());
                fileData.setFileSize(file.getSize());
                fileData.setFileData(file.getBytes());
                fileDataList.add(fileData);
            }

            inspec.setFiles(fileDataList);
            inspec.setArchived(false);// Assign all files to the Inspec record
            Inspec savedInspec = inspecRepository.save(inspec);
            LOGGER.info("Inspec created with multiple files");
            return savedInspec;
        } else {
            throw new RuntimeException("User or School not found with ID - User: " + inspectorId + ", School: " + schoolId);
        }
    }


    public List<Inspec> getAllInspecs() {
        return inspecRepository.findAll();
    }

    public Optional<Inspec> getInspecById(Long id) {
        return inspecRepository.findById(id);
    }

    public List<Inspec> getAllInspecsByUserAndSchool(Long userId, Long schoolId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("School not found with ID: " + schoolId));

        return inspecRepository.findByUserAndSchool(user, school);
    }

//    public void deleteInspecById(Long id) {
//        if (inspecRepository.existsById(id)) {
//            inspecRepository.deleteById(id);
//            LOGGER.info("Deleted Inspec with ID: " + id);
//        } else {
//            LOGGER.warning("Attempt to delete non-existent Inspec with ID: " + id);
//        }
//    }
    public void deleteInspecById(Long id) {
        Optional<Inspec> inspecOpt = inspecRepository.findById(id);
        if (inspecOpt.isPresent()) {
            Inspec inspec = inspecOpt.get();
            inspec.getFiles().clear(); // Clear the list of files to remove all associations with FileData
            inspecRepository.save(inspec); // Save the entity to persist the changes

            // Now delete the Inspec itself
            inspecRepository.deleteById(id);
            LOGGER.info("Deleted Inspec with ID: " + id);
        } else {
            LOGGER.warning("Attempt to delete non-existent Inspec with ID: " + id);
        }
    }

//    public void deleteInspectionsByUserAndSchool(Long userId, Long schoolId) {
//        inspecRepository.deleteByUserIdAndSchoolId(userId, schoolId);
//    }
    public void deleteInspectionsByUserAndSchool(Long userId, Long schoolId) {
        List<Inspec> inspecs = inspecRepository.findByUserAndSchool(
            userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")),
            schoolRepository.findById(schoolId).orElseThrow(() -> new RuntimeException("School not found"))
        );

        for (Inspec inspec : inspecs) {
            // Clear child associations
            inspec.getFiles().clear();
            inspecRepository.save(inspec);
        }

        // Now delete all the inspec records
        inspecRepository.deleteAll(inspecs);
        LOGGER.info("Deleted inspections by user ID " + userId + " and school ID " + schoolId);
    }

    // Archive inspections by user and school
    public void archiveInspectionsByUserAndSchool(Long userId, Long schoolId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        School school = schoolRepository.findById(schoolId).orElseThrow(() -> new RuntimeException("School not found"));

        List<Inspec> inspecs = inspecRepository.findByUserAndSchoolAndIsArchived(user, school, false);
        for (Inspec inspec : inspecs) {
            inspec.setArchived(true);
            inspecRepository.save(inspec);
        }
        LOGGER.info("Archived inspections by user ID " + userId + " and school ID " + schoolId);
    }

    // Get all inspections including archived
   

    // Get only active inspections
    public List<Inspec> getAllActiveInspecs() {
        return inspecRepository.findByIsArchived(false);
    }

    // Get active inspection by ID
    public Optional<Inspec> getActiveInspecById(Long id) {
        return inspecRepository.findByIdAndIsArchived(id, false);
    }

    // Get active inspections by user and school
    public List<Inspec> getAllActiveInspecsByUserAndSchool(Long userId, Long schoolId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        School school = schoolRepository.findById(schoolId).orElseThrow(() -> new RuntimeException("School not found with ID: " + schoolId));

        return inspecRepository.findByUserAndSchoolAndIsArchived(user, school, false);
    }
}

