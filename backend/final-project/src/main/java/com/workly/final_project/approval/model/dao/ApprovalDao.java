package com.workly.final_project.approval.model.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.vo.Approval;

@Mapper
public interface ApprovalDao {
	int insertApproval(Approval approval);
	Approval selectApprovalById(int approvalNo);
	List<Approval> getAllApprovals();

}
