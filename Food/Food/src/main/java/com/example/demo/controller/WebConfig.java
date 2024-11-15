package com.example.demo.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // You can restrict paths with specific patterns
            .allowedOrigins("http://localhost:4200") // Specifies the allowed origins
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specifies the allowed methods
            .allowedHeaders("*") // Allows all headers
            .allowCredentials(true); // Support credentials
    }
}
