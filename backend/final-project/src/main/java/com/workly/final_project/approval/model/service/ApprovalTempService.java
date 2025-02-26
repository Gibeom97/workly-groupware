package com.workly.final_project.approval.model.service;

import java.util.List;

import com.workly.final_project.approval.model.vo.ApprovalTemp;

public interface ApprovalTempService {

	int saveTempApproval(ApprovalTemp approvalTemp); // 임시 저장
    List<ApprovalTemp> getTempApprovalsByUser(int userNo); // 사용자별 임시저장 조회
    void deleteTempApprovals(List<Integer> tempNos); // 삭제
    ApprovalTemp getTempApprovalById(int tempNo); // TEMP_NO로 조회
    int updateTempApproval(ApprovalTemp approvalTemp); // 수정

}