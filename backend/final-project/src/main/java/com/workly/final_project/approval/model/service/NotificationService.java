package com.workly.final_project.approval.model.service;

import java.util.List;

import com.workly.final_project.approval.model.vo.ApprovalLine;

public interface NotificationService {

	List<ApprovalLine> getUnreadNotifications(int userNo);

	void markAsRead(int approvalNo, int userNo);

	void approveAndNotifyNext(int approvalNo, int currentLevel);

}
