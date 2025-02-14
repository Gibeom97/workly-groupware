package com.workly.final_project.attendance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.workly.final_project.attendance.service.AttendanceService;
import com.workly.final_project.attendance.dto.AttendanceDTO;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AttendanceApiController {
    
    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/saveAttendanceExcel")
    public ResponseEntity<?> saveExcel(@RequestBody List<AttendanceDTO> attendanceList) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("📥 Received data: " + attendanceList);
            attendanceService.createAndSaveExcel(attendanceList);
            response.put("success", true);
            response.put("message", "근무기록이 성공적으로 저장되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 