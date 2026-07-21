package com.kimu.microservice.api_gateway.config;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class SecurityConfig {

	private final String[] apiUrls = { "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**",
			"/swagger-resources/**", "/api-docs/**", "/aggregate/**", "/actuator/prometheus" };

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(apiUrls)
				.permitAll().anyRequest()
				.authenticated())
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
				.exceptionHandling(exception -> exception.authenticationEntryPoint(
						(request, response, authException) -> {
							response.setStatus(HttpStatus.UNAUTHORIZED.value());
							response.setContentType(MediaType.APPLICATION_JSON_VALUE);

							Map<String, Object> errorDetails = Map.of(
									"status", 401,
									"error", "Unauthorized",
									"message", authException.getMessage());

							new ObjectMapper().writeValue(response.getOutputStream(),
									errorDetails);
						}))
				.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:5173", "http://frontend.localhost:8080"));
		config.applyPermitDefaultValues();
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
