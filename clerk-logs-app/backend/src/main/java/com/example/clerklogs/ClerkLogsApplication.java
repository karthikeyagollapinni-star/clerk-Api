package com.example.clerklogs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClerkLogsApplication {

	public static void main(String[] args) {
		System.out.println("Force starting ClerkLogsApplication on PORT 9090...");
		SpringApplication.run(ClerkLogsApplication.class, args);
	}

}
