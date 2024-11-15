package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Inspec;
import com.example.demo.model.School;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


//import com.example.demo.model.Inspection;
@Repository
public interface InspecRepository extends JpaRepository<Inspec, Long> {

	List<Inspec> findByUserAndSchool(User user, School school);
	  @Modifying
	    @Transactional
	    @Query("DELETE FROM Inspec i WHERE i.user.id = :userId AND i.school.id = :schoolId")
	    void deleteByUserIdAndSchoolId(@Param("userId") Long userId, @Param("schoolId") Long schoolId);
	  List<Inspec> findAll();

	    // Find only active inspections (not archived)
	    List<Inspec> findByIsArchived(boolean isArchived);

	    // Find an inspection by ID if it is active (not archived)
	    Optional<Inspec> findByIdAndIsArchived(Long id, boolean isArchived);

	    // Find active inspections by user and school
	    List<Inspec> findByUserAndSchoolAndIsArchived(User user, School school, boolean isArchived);
		
}