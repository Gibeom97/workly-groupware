package com.workly.final_project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:3000", "http://localhost:3000", 
                              "http://127.0.0.1:8003", "http://localhost:8003",
                              "http://localhost:5173")

               .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. static 폴더 전체에 대한 기본 매핑
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/"); 
                // 필요하다면 "classpath:/public/", "classpath:/resources/" 등도 추가

        // 2. 혹은 uploads 폴더만 따로 세분화해서 매핑할 수도 있음
        registry.addResourceHandler("/uploads/profile/**")
                .addResourceLocations("classpath:/static/uploads/profile/");
    }
}