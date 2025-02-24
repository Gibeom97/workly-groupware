package com.workly.final_project.approval.model.service;

import java.util.List;
import java.util.Map;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import org.springframework.http.ResponseEntity;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;

public interface ApprovalService {

	int createApproval(Approval approval);

	Approval getApprovalById(int approvalNo);
	
	List<Approval> getAllApprovals(); // 모든 결재 문서 조회

	List<Map<String, Object>> getDepartmentsWithEmployees();

	List<Approval> getDraftApprovals();

	int deleteApprovals(List<Integer> approvalNos);

	int tempSaveApproval(Approval approval);

	Approval getApprovalByNo(int approvalNo);

	Approval getApprovalData(int approvalNo);

	List<ApprovalLine> getApprovalLine(int approvalNo);

	List<ApprovalAttachment> getApprovalAttachmentByApprovalNo(int approvalNo);

	List<ApprovalMemo> getApprovalMemo(int approvalNo, int userNo);

	Approval getApprovalWriteUser(int userNo);

}
