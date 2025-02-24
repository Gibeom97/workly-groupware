package com.workly.final_project.leave.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.leave.model.dto.AnnualHistoryDTO;
import com.workly.final_project.leave.model.service.LeaveService;
import com.workly.final_project.leave.model.vo.AnnualLeave;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class LeaveController {
	
	private final LeaveService service;

	@GetMapping("/leave")
	public String salary(Model model) {
		return "leave";
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/myLeave")
	public ResponseEntity<?>  selectLeaveHistory(
			@RequestParam int year,
			@RequestParam int userNo,
			@RequestParam int cPage
			) {
		AnnualHistoryDTO history = AnnualHistoryDTO.builder()
												   .annualLeave(AnnualLeave.builder()
																		   .userNo(userNo)
																		   .year(year)
																		   .build())
												   .build();
		
		int listCount = service.selectLeaveCount(history);
		log.debug("history: {}", history);
		
		PageInfo pi = Util.pagination(cPage, listCount);
		
		List<AnnualHistoryDTO> list = service.selectLeaveHistory(pi, history);
		log.debug("list: {}", list);
		
		if(list.size() > 0) {
			Map<String, Object> res = new HashMap<>();
			res.put("pi", pi);
			res.put("list", list);
			return ResponseEntity.ok().body(res);
		} else {
			Map<String, Object> error = new HashMap<>();
			error.put("msg", "연차 사용 내역을 조회할 수 없습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/leaveDetail")
	public List<AnnualHistoryDTO> selectLeaveDetail(
			@RequestParam int userNo,
			@RequestParam int year
			) {
		AnnualHistoryDTO history = AnnualHistoryDTO.builder()
				  								   .annualLeave(AnnualLeave.builder()
				  										   				   .userNo(userNo)
				  										   				   .year(year)
				  										   				   .build())
				  								   .build();
		log.debug("history: {}", history);
		
		List<AnnualHistoryDTO> list = service.selectLeaveDetail(history);
		log.debug("list: {}", list);
		
		return list;
	}
	
	@CrossOrigin("http://localhost:5173")
	@PutMapping("/updateLeave")
	public ResponseEntity<Map<String, Object>> updateLeave(
			@RequestParam int userNo,
			@RequestParam int year,
			@RequestParam int updateLeave
			) {
		log.debug("userNo : {}", userNo);
		log.debug("year : {}", year);
		log.debug("updateLeave : {}", updateLeave);
		
		AnnualLeave leave = AnnualLeave.builder()
									   .userNo(userNo)
									   .year(year)
									   .totalAnnualLeave(updateLeave)
									   .build();
		
		int result = service.updateLeave(leave);
		log.debug("result : {}", result);
		ResponseEntity<Map<String, Object>> responseEntity = null;
		
		if(result > 0) {
			Map<String, Object> map = new HashMap<>();
			map.put("msg", leave.getUserNo() + " 사원의 "+ year + "년 총 연차수를 "+ updateLeave + "일로 변경하였습니다.");
			responseEntity = ResponseEntity.ok().body(map);
		} else {
			Map<String, Object> error = new HashMap<>();
			error.put("msg", leave.getUserNo() + " 사원의 총 연차수 변경에 실패하였습니다.");
			responseEntity =  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
		return responseEntity;
	}
}
