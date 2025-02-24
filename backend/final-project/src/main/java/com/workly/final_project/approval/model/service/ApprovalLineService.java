package com.workly.final_project.approval.model.service;

import java.util.List;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.ApprovalLine;

public interface ApprovalLineService {

	void saveApprovalLine(List<ApprovalLine> approvalLines);
	
//	List<ApprovalLine> getInProgressApprovals(int userNo);
}
