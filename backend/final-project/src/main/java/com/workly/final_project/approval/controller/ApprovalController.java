package com.workly.final_project.approval.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.service.ApprovalService;
import com.workly.final_project.approval.model.vo.Approval;


@RestController
@RequestMapping("/api/approval")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalController {
	
	@Autowired
	private ApprovalService approvalService;
	
	// 1. 결재 문서 생성 API
	@PostMapping("/submit")
	public ResponseEntity<Map<String, Object>> submitApproval(@RequestBody Approval approval) {
		System.out.println("Received Approval: " + approval);
		int result = approvalService.createApproval(approval);
		if(result > 0) {
			int approvalNo = approval.getApprovalNo();
			
			Map<String, Object> response = new HashMap<>();
			response.put("message", "결재 문서 저장 완료");
			response.put("approvalNo", approvalNo);
			
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.badRequest().body(Map.of("message", "결재 문서 저장 실패"));
	}
	
	// 2. 특정 결재 문서 조회 API
	@GetMapping("/{approvalNo}")
	public ResponseEntity<Approval> getApproval(@PathVariable int approvalNo){
		Approval approval = approvalService.getApprovalById(approvalNo);
		if(approval != null) {
			return ResponseEntity.ok(approval);
		}
		return ResponseEntity.notFound().build();
	}
	
	// 3. 모든 결재 문서 조회 API
	@GetMapping("/all")
	public ResponseEntity<List<Approval>> getAllApprovals() {
		return ResponseEntity.ok(approvalService.getAllApprovals());
	}
}


























