package com.workly.final_project.attendance.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.attendance.model.service.AttendanceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class AttendanceController {
	
	private final AttendanceService service;
	
	@GetMapping("/insertAttendance")
	public ResponseEntity<Map<String, Object>> insertAttendance(
			@RequestParam int userNo
			) {
		int result = service.insertAttendance(userNo);
		HashMap<String, Object> map = new HashMap<>();
		Date date = new Date();
		
		if (result > 0) {
			map.put("msg", "출근되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
		} else {
			map.put("msg", "출근 기록에 오류가 발생하였습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}
	
	@GetMapping("updateAttendance")
	public ResponseEntity<Map<String, Object>> updateAttendance(
			@RequestParam int userNo
			) {
		int result = service.updateAttendance(userNo);
		HashMap<String, Object> map = new HashMap<>();
		Date date = new Date();
		
		if (result > 0) {
			map.put("msg", "퇴근처리되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
		} else {
			map.put("msg", "퇴근 기록에 오류가 발생하였습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}
}