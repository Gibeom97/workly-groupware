package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalDao;
import com.workly.final_project.approval.model.vo.Approval;

@Service
public class ApprovalServiceImpl implements ApprovalService{
	
	@Autowired
	private ApprovalDao approvalDao;

	@Transactional
	@Override
	public int createApproval(Approval approval) {
		return approvalDao.insertApproval(approval);
	}

	@Transactional
	@Override
	public Approval getApprovalById(int approvalNo) {
		return approvalDao.selectApprovalById(approvalNo);
	}

	@Transactional
	@Override
	public List<Approval> getAllApprovals() {
		return approvalDao.selectAllAPprovals();
	}


}
