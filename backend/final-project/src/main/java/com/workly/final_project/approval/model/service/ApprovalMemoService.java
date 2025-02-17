package com.workly.final_project.approval.model.service;

import java.util.List;

import com.workly.final_project.approval.model.vo.ApprovalMemo;

public interface ApprovalMemoService{

	int createApprovalMemo(ApprovalMemo approvalMemo);

	List<ApprovalMemo> getMemosByApprovalId(int approvalNo);
}
