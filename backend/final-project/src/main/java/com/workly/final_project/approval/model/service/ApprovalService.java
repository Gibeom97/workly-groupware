package com.workly.final_project.approval.model.service;

import java.util.List;
    
import com.workly.final_project.approval.model.vo.Approval;

public interface ApprovalService {

	int createApproval(Approval approval);

	Approval getApprovalById(int approvalNo);
	
	List<Approval> getAllApprovals(); // 모든 결재 문서 조회

}
