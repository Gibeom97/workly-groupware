package com.workly.final_project.approval.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;

@Mapper
public interface ApprovalDao {
	int insertApproval(Approval approval);
	Approval selectApprovalById(int approvalNo);
	List<Approval> getAllApprovals();
	List<Map<String, Object>> getDepartmentsWithEmployees();
	Approval getApprovalData(int approvalNo);
	List<ApprovalLine> getApprovalLine(int approvalNo);
	List<ApprovalAttachment> getApprovalAttachmentByApprovalNo(int approvalNo);
	List<ApprovalMemo> getApprovalMemo(int approvalNo, int userNo);
	Approval getApprovalWriteUser(int userNo);

}
