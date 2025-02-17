package com.workly.final_project.approval.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.service.ApprovalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalController {
    private final ApprovalService approvalService;

    @GetMapping("/list")
    public List<Approval> getAllApprovals() {
        List<Approval> approvals = approvalService.getAllApprovals();
        System.out.println("결재 목록: " + approvals); // 로그 추가
        return approvals;
    }

}
