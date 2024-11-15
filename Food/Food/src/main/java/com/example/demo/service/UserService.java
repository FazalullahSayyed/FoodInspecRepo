package com.example.demo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.demo.model.User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return (UserDetails) new User(user.getEmail(), user.getPassword(), user.getRole()); // Adjust authorities as needed
    }


    @Autowired
    private UserRepository userRepository;


    public boolean validateUser(String email, String password, String role) {
        User user = userRepository.findByEmail(email);
        
        // Check if user exists, password matches, and role is correct
        return user != null && user.getPassword().equals(password) && user.getRole().equals(role);
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("User with this email already exists");
        }
        userRepository.save(user);
    }
}
