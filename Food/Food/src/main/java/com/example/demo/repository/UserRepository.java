package com.example.demo.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.School;
import com.example.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT s FROM School s WHERE s.user.id = :userId")
	List<School> findSchoolsByUserId(@Param("userId") Long userId);
    
    boolean existsByEmail(String email);

	User findByEmail(String username);
}
