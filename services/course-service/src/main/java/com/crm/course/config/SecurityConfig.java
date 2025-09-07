package com.crm.course.config;


import com.crm.course.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {


@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
http
.csrf().disable()
.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
.and()
.authorizeHttpRequests()
.requestMatchers("/health", "/actuator/**").permitAll()
.requestMatchers("/api/v1/courses/public/**").permitAll()
.anyRequest().authenticated()
.and()
.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


return http.build();
}
}