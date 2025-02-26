package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.vo.ApprovalTemp;

@Mapper
public interface ApprovalTempDao {

	int saveTempApproval(ApprovalTemp approvalTemp);
    List<ApprovalTemp> getTempApprovalsByUser(int userNo);
    int deleteTempApprovals(List<Integer> tempNos);
    ApprovalTemp getTempApprovalById(int tempNo);
    int updateTempApproval(ApprovalTemp approvalTemp);

	
	
}
