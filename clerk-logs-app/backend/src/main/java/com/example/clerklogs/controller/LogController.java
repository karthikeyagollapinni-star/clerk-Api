package com.example.clerklogs.controller;

import com.example.clerklogs.service.ClerkService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development simplicity
public class LogController {

    private final ClerkService clerkService;

    public LogController(ClerkService clerkService) {
        this.clerkService = clerkService;
    }

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getUsers() {
        try {
            return ResponseEntity.ok(clerkService.getUsers());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping(value = "/logs/sessions", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getSessionLogs() {
        try {
            return ResponseEntity.ok(clerkService.getSessions());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping(value = "/logs/events", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getEventLogs() {
         try {
            return ResponseEntity.ok(clerkService.getEventLogs());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
