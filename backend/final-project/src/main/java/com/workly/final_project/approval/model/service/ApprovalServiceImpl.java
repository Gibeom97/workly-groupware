package com.workly.final_project.approval.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalDao;
import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.Approval;

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
	public List<Map<String, Object>> getDepartmentsWithEmployees() {
		return approvalDao.getDepartmentsWithEmployees();
	}

	@Override
	public List<Approval> getDraftApprovals() {
		return approvalDao.getDraftApprovals();
	}

	@Override
	public int deleteApprovals(List<Integer> approvalNos) {
		return approvalDao.deleteApprovals(approvalNos);
	}

	@Override
	public int tempSaveApproval(Approval approval) {
	    return approvalDao.insertTempApproval(approval);
	}

	@Override
	public Approval getApprovalByNo(int approvalNo) {
	    return approvalDao.getApprovalByNo(approvalNo);
	}


}

