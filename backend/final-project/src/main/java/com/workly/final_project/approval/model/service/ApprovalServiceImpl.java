package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalDao;
import com.workly.final_project.approval.model.vo.Approval;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final ApprovalDao approvalDao; // ✅ SqlSession 제거

    @Override
    public List<Approval> getAllApprovals() {
        List<Approval> approvals = approvalDao.getAllApprovals(); // ✅ session 제거
        System.out.println("ApprovalServiceImpl - 가져온 데이터: " + approvals); // 로그 추가
        return approvals;
    }

    @Override
    public Approval getApprovalById(int approvalNo) {
        return approvalDao.selectApprovalById(approvalNo); // ✅ session 제거
    }

    @Override
    @Transactional
    public int createApproval(Approval approval) {
        return approvalDao.insertApproval(approval); // ✅ session 제거
    }

    @Override
    @Transactional
    public int updateApproval(Approval approval) {
        return approvalDao.updateApproval(approval); // ✅ session 제거
    }

    @Override
    @Transactional
    public int deleteApproval(int approvalNo) {
        return approvalDao.deleteApproval(approvalNo); // ✅ session 제거
    }
}
