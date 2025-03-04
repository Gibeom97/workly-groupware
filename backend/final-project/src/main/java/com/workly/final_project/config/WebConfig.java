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
        // ✅ 기존 정적 리소스 설정 유지
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");

        registry.addResourceHandler("/uploads/profile/**")
                .addResourceLocations("classpath:/static/uploads/profile/");

        // ✅ chatFile 폴더를 명확하게 매핑
        registry.addResourceHandler("/uploads/chatFile/**")
                .addResourceLocations("file:C:/FinalProject/backend/final-project/src/main/resources/static/uploads/chatFile/")
                .setCachePeriod(3600);
        
        registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:C:/upload/");

    }
}
