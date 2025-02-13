package com.workly.final_project.salary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.workly.final_project.salary.service.SalaryService;
import com.workly.final_project.salary.dto.SalaryDTO;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SalaryApiController {
    
    @Autowired
    private SalaryService salaryService;

    @PostMapping("/saveExcel")
    public ResponseEntity<?> saveExcel(@RequestBody SalaryDTO salaryDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("📥 Received data: " + salaryDTO);
            System.out.println("💡 API endpoint hit: /api/saveExcel");
            salaryService.createAndSaveExcel(salaryDTO);
            response.put("success", true);
            response.put("message", "급여대장이 성공적으로 저장되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
