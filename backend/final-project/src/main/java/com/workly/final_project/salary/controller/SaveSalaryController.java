package com.workly.final_project.salary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/salary")
public class SaveSalaryController {
    
    @GetMapping("/save")
    public String saveSalaryForm() {
        return "salary";
    }
    
    @PostMapping("/save")
    @ResponseBody
    public String saveSalary() {
        // 급여 저장 로직
        return "급여가 저장되었습니다.";
    }
}