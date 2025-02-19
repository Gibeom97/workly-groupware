package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workly.final_project.approval.model.dao.ApprovalLineDao;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@Service
public class ApprovalLineServiceImpl implements ApprovalLineService{
	
	@Autowired
	private ApprovalLineDao dao;

	@Override
	public void saveApprovalLine(List<ApprovalLine> approvalLines) {
		dao.saveApprovalLine(approvalLines);
		
	}
}
