package com.workly.final_project.approval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.service.NotificationService;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {
	
	@Autowired
	private NotificationService service;
	
	// 특정 유저의 알림 조회
	@GetMapping("/{userNo}")
	public List<ApprovalLine> getUnreadNotifications(@PathVariable int userNo){
		return service.getUnreadNotifications(userNo);
	}
	
	// 알림 읽음 처리
	@PostMapping("/read")
	public void markAsRead(@RequestParam int approvalNo, @RequestParam int userNo) {
		service.markAsRead(approvalNo, userNo);
	}
	
	// 결재 승인 시 다음 결재자 알림
//	@PostMapping("/approve")
//	public void approveAndNotifyNext(@RequestParam int approvalNo, @RequestParam int currentLevel) {
//		service.approveAndNotifyNext(approvalNo, currentLevel);
//	}
}
