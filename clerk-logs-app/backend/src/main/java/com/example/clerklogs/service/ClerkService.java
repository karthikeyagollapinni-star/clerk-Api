package com.example.clerklogs.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ClerkService {

    private final RestClient restClient;

    public ClerkService(@Value("${clerk.api.url}") String apiUrl,
            @Value("${clerk.api.key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String getUsers() {
        return restClient.get()
                .uri("/users?limit=100")
                .retrieve()
                .body(String.class);
    }

    public String getSessions() {
        return restClient.get()
                .uri("/sessions?limit=100")
                .retrieve()
                .body(String.class);
    }

    // Implementing a proxy for 'audit' logs by fetching actual audit logs
    public String getEventLogs() {
        return restClient.get()
                .uri("/audit_logs?limit=100")
                .retrieve()
                .body(String.class);
    }
}
