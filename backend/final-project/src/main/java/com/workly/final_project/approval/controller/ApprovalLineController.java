package com.workly.final_project.approval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.service.ApprovalLineService;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@RestController
@RequestMapping("/api/approval")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalLineController {
	
	@Autowired
	private ApprovalLineService service;

	// 결재라인 저장 API
	@PostMapping("saveApprovalLine")
	public ResponseEntity<String> saveApprovalLine(@RequestBody List<ApprovalLine> approvalLines){
		System.out.println("받아온 라인값:" + approvalLines);
		service.saveApprovalLine(approvalLines);
		return ResponseEntity.ok("결재라인이 저장되었습니다.");
	}
}
