package com.workly.final_project.approval.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.service.ApprovalMemoService;
import com.workly.final_project.approval.model.vo.ApprovalMemo;

@RestController
@RequestMapping("/api/approvalMemos")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalMemoController {

    @Autowired
    private ApprovalMemoService approvalMemoService;

    // 📝 1. 결재 의견 저장 API
    @PostMapping("/create")
    public ResponseEntity<String> createApprovalMemo(@RequestBody ApprovalMemo approvalMemo) {
    	System.out.println("Received ApprovalMemo: " + approvalMemo);
    	     
        int result = approvalMemoService.createApprovalMemo(approvalMemo);
        if (result > 0) {
            return ResponseEntity.ok("결재 의견 저장 완료");
        }
        return ResponseEntity.badRequest().body("결재 의견 저장 실패");
    }

    // 📝 2. 특정 결재 문서에 대한 결재 의견 조회 API
    @GetMapping("/{approvalNo}")
    public ResponseEntity<List<ApprovalMemo>> getMemosByApprovalId(@PathVariable int approvalNo) {
        return ResponseEntity.ok(approvalMemoService.getMemosByApprovalId(approvalNo));
    }
}
