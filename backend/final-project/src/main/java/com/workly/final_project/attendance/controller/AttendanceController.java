package com.workly.final_project.attendance.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
=======
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.attendance.model.service.AttendanceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

<<<<<<< HEAD
@Slf4j
=======
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
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
<<<<<<< HEAD
		
		if (result > 0) {
			Date date = new Date();
			map.put("msg", "출근처리되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
		} else {
			Date date = service.selectWorkOn(userNo);
			map.put("msg", "금일 출근 내역이 존재합니다.");
			map.put("date", date);
=======
		Date date = new Date();
		
		if (result > 0) {
			map.put("msg", "출근되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
		} else {
			map.put("msg", "출근 기록에 오류가 발생하였습니다.");
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}
	
	@GetMapping("updateAttendance")
	public ResponseEntity<Map<String, Object>> updateAttendance(
			@RequestParam int userNo
			) {
		int result = service.updateAttendance(userNo);
		HashMap<String, Object> map = new HashMap<>();
<<<<<<< HEAD
		
		switch(result) {
		case 1: {
			Date date = new Date();
			map.put("msg", "퇴근처리되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
			}
		case 2: {
			map.put("msg", "금일 출근 내역이 존재하지않습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
			}
		case 3: {
			Date date = service.selectWorkOff(userNo);
			map.put("msg", "금일 퇴근 내역이 존재합니다.");
			map.put("date", date);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
			}
		default: {
			map.put("msg", "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		    }
=======
		Date date = new Date();
		
		if (result > 0) {
			map.put("msg", "퇴근처리되었습니다.");
			map.put("date", date);
			return ResponseEntity.ok(map); 
		} else {
			map.put("msg", "퇴근 기록에 오류가 발생하였습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
		}
	}
}