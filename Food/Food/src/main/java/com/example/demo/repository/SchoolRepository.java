package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.School;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findSchoolsByUserId(Long userId);

	   List<School> findByInspectorId(Long inspectorId);
}
