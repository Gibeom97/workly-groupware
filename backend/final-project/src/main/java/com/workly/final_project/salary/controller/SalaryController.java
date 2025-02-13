package com.workly.final_project.salary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SalaryController {
    
    @GetMapping("/salary")
    public String salary(Model model) {
        return "salary";
    }
}
