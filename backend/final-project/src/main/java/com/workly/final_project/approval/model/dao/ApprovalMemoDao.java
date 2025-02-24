package com.workly.final_project.approval.model.dao;

import java.util.List;

import com.workly.final_project.approval.model.vo.ApprovalMemo;

public interface ApprovalMemoDao {

	int insertApprovalMemo(ApprovalMemo approvalMemo);

	List<ApprovalMemo> selectMemosByApprovalId(int approvalNo);

	boolean updateApprovalReply(int memoNo, String memoContent);

	boolean deleteApproval(int memoNo);

}
