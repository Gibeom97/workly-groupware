package com.workly.final_project.approval.model.dao;

import java.util.List;

import com.workly.final_project.approval.model.vo.Approval;

public interface ApprovalDao {
	int insertApproval(Approval approval);
	Approval selectApprovalById(int approvalNo);
	List<Approval> selectAllAPprovals();
}
