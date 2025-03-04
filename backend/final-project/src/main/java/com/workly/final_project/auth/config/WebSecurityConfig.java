package com.workly.final_project.auth.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.workly.final_project.auth.model.filter.JwtFilter;
import com.workly.final_project.auth.model.jwt.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {
	
	private final JwtTokenProvider provider;
	  
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// cors 설정
		http.cors(
				csrfConfig -> csrfConfig.configurationSource(new CorsConfigurationSource() {
					@Override
					public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
						CorsConfiguration config = new CorsConfiguration();
						config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
						config.setAllowedMethods(Collections.singletonList("*"));
						config.setAllowCredentials(true);
						config.setAllowedHeaders(Collections.singletonList("*"));
						config.setMaxAge(3600L);
						
						return config;
					}
				}) 
			);
		
		// csrf 설정
		http
			.csrf(csrf -> csrf.disable())
			.sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		// url별 권한관리
		http.authorizeHttpRequests(
				config -> config.requestMatchers("/**").permitAll()
//				config -> config.requestMatchers("/login", "/error", "/uploads/profile/**").permitAll() // 비로그인 시 접근 가능 경로
//								.requestMatchers("/personnel", "/memberSearch", "/enroll", 
//										 "/updatePolicy", "/leavePolicy", "/leaveDetail", "/updateLeave").hasRole("HR") // HR만 접근 가능 경로
//								.anyRequest().hasAnyRole("USER", "HR") // USER 접근 가능 경로
				);
		
		// jwt활용하여 사용자를 인증시키는 필터
		http.addFilterBefore(new JwtFilter(provider), UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
}
