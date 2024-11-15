package com.example.demo.service;

import com.example.demo.model.FoodInspector;
import com.example.demo.model.User;
import com.example.demo.repository.FoodInspectorRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class FoodInspectorService {

    @Autowired
    private FoodInspectorRepository foodInspectorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public FoodInspector registerInspector(FoodInspector inspector) {
        // Check if user with the same email already exists
        if (userRepository.existsByEmail(inspector.getEmail())) {
            throw new RuntimeException("User already exists with this email: " + inspector.getEmail());
        }

        // Generate random password
        String randomPassword = generateRandomPassword();

        // Create user object
        User user = new User(inspector.getEmail(), randomPassword, inspector.getRole());

        // Save user in database
        userRepository.save(user);

        // Save the FoodInspector entity
        FoodInspector savedInspector = foodInspectorRepository.save(inspector);

        // Send welcome email
        sendWelcomeEmail(inspector, randomPassword);
        return savedInspector;
    }

    private String generateRandomPassword() {
        // Generate a random 10-character password (for simplicity, using alphanumeric characters)
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            int randomIndex = (int) (Math.random() * chars.length());
            password.append(chars.charAt(randomIndex));
        }
        return password.toString();
    }

    private void sendWelcomeEmail(FoodInspector inspector, String password) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(inspector.getEmail());
            helper.setSubject("Welcome to the Food Inspection System");
            helper.setText(
                    "Hello " + inspector.getName() + ",\n\n" +
                            "Welcome to the Food Inspection System. Your role is " + inspector.getRole() + ".\n" +
                            "Your login credentials are:\n" +
                            "Username: " + inspector.getEmail() + "\n" +
                            "Password: " + password + "\n\n" +
                            "Best Regards,\nFood Inspection Team",
                    true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public Optional<FoodInspector> findInspectorById(Long inspectorId) {
        return foodInspectorRepository.findById(inspectorId);
    }
}
