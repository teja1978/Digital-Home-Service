package com.localservicemarketplace;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication
public class LocalServiceMarketplaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LocalServiceMarketplaceApplication.class, args);
	}

}
