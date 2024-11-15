package com.example.demo.repository;
import java.util.List;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.CustomMapping;
import com.example.demo.model.FoodInspector;
import com.example.demo.model.Inspection;
import com.example.demo.model.School;
import com.example.demo.model.User;

public interface MappingRepository extends JpaRepository<CustomMapping, Long> {
	List<CustomMapping> findBySchool(School school);
//    List<CustomMapping> findByInspection(Inspection inspection);
	List<CustomMapping> findByInspector(FoodInspector inspector);
	List<CustomMapping> findByInspector_Id(Long inspectorId); 
//	 Optional<CustomMapping> findBySchool_Id(Long schoolId);
//	List<CustomMapping> findBySchool_Id(Long schoolId); 
	
	Optional<CustomMapping> findBySchoolAndInspector(School school, FoodInspector inspector);
	
}
