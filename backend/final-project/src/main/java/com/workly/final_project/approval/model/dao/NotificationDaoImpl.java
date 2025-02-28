package com.workly.final_project.approval.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalLine;

@Repository
public class NotificationDaoImpl implements NotificationDao{

	@Autowired
	private final SqlSession sqlSession;
	
	public NotificationDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public List<ApprovalLine> getUnreadNotifications(int userNo) {
		return sqlSession.selectList("Notification.getUnreadNotifications", userNo);
	}

	@Override
	public void markAsRead(int approvalNo, int userNo) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("userNo", userNo);
			
		sqlSession.update("Notification.markAsRead", paramMap);
		
	}


	@Override
	public void notifyNextApprover(int approvalNo, int nextLevel) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("approvalLevel", nextLevel);
		
		sqlSession.update("Notification.notifyNextApprover", paramMap);
	}
}
