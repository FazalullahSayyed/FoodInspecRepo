package com.example.demo.model;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class CustomLocalTimeDeserializer extends JsonDeserializer<LocalTime> {
    @Override
    public LocalTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String timeString = p.getText();
        System.out.println("Parsing LocalTime from string: " + timeString); // Debugging line
        try {
            // Attempt to parse the time string in 12-hour format
            return LocalTime.parse(timeString, DateTimeFormatter.ofPattern("hh:mm a"));
        } catch (DateTimeParseException e) {
            System.out.println("Failed to parse LocalTime: " + timeString); // Debugging line
            throw new IOException("Failed to parse LocalTime: " + timeString, e);
        }
    }
}
