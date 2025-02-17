package com.workly.final_project.approval.model.service;

import java.util.List;
import com.workly.final_project.approval.model.vo.Approval;

public interface ApprovalService {
    List<Approval> getAllApprovals();
    Approval getApprovalById(int approvalNo);
    int createApproval(Approval approval);
    int updateApproval(Approval approval);
    int deleteApproval(int approvalNo);
}
