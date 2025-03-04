package com.workly.final_project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@MapperScan({
    "com.workly.final_project.mapper",
    "com.workly.final_project.chat.model.dao"
   // "com.workly.final_project.chat.model.dao"
})
@SpringBootApplication
@ComponentScan(basePackages = {
	    "com.workly.final_project",
	    "com.workly.final_project.salary.controller",
	    "com.workly.final_project.salary.service",
	    "com.workly.final_project.approval"
	})
@EnableScheduling
public class FinalProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectApplication.class, args);
	}
}


