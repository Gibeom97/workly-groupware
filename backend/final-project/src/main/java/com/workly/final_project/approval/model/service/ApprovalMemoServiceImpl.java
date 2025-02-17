package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalMemoDao;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalMemo;

@Service
public class ApprovalMemoServiceImpl implements ApprovalMemoService{
	
	@Autowired
	private ApprovalMemoDao approvalMemoDao;

	@Transactional
	@Override
	public int createApprovalMemo(ApprovalMemo approvalMemo) {
		return approvalMemoDao.insertApprovalMemo(approvalMemo);
	}

	@Transactional
	@Override
	public List<ApprovalMemo> getMemosByApprovalId(int approvalNo) {
		return approvalMemoDao.selectMemosByApprovalId(approvalNo);
	}



}
