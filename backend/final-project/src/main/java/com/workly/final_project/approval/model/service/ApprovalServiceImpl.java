package com.workly.final_project.approval.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalDao;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ApprovalServiceImpl implements ApprovalService {
	
	@Autowired
	private ApprovalDao approvalDao;

	@Transactional
	@Override
	public int createApproval(Approval approval) {
		return approvalDao.insertApproval(approval);
	}

	@Transactional
	@Override
	public Approval getApprovalById(int approvalNo) {
		return approvalDao.selectApprovalById(approvalNo);
	}

  
    @Override
    public List<Approval> getAllApprovals() {
        List<Approval> approvals = approvalDao.getAllApprovals(); // ✅ session 제거
        System.out.println("ApprovalServiceImpl - 가져온 데이터: " + approvals); // 로그 추가
        return approvals;
    }

	@Override
	@Transactional
	public List<Map<String, Object>> getDepartmentsWithEmployees() {
		return approvalDao.getDepartmentsWithEmployees();
	}

	@Override
	public Approval getApprovalData(int approvalNo) {
		return approvalDao.getApprovalData(approvalNo);
	}

	@Override
	public List<ApprovalLine> getApprovalLine(int approvalNo) {
		return approvalDao.getApprovalLine(approvalNo);
	}

	@Override
	public List<ApprovalAttachment> getApprovalAttachmentByApprovalNo(int approvalNo) {
		return approvalDao.getApprovalAttachmentByApprovalNo(approvalNo);
	}

	@Override
	public List<ApprovalMemo> getApprovalMemo(int approvalNo, int userNo) {
		return approvalDao.getApprovalMemo(approvalNo, userNo);
	}

	@Override
	public Approval getApprovalWriteUser(int approvalNo) {
		return approvalDao.getApprovalWriteUser(approvalNo);
	}
}

