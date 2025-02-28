package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.NotificationDao;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@Service
public class NotificationServiceImpl implements NotificationService{
	
	@Autowired
	private NotificationDao dao;

	@Override
	@Transactional
	public List<ApprovalLine> getUnreadNotifications(int userNo) {
		return dao.getUnreadNotifications(userNo);
	}

	@Override
	@Transactional
	public void markAsRead(int approvalNo, int userNo) {
		dao.markAsRead(approvalNo, userNo);
	}

	@Override
	@Transactional
	public void approveAndNotifyNext(int approvalNo, int currentLevel) {
		// 현재 결재자 승인 처리
		dao.markAsRead(approvalNo, currentLevel);
		
		// 다음 결재자가 있으면 알림 활성화
		dao.notifyNextApprover(approvalNo, currentLevel + 1);
	}

}
