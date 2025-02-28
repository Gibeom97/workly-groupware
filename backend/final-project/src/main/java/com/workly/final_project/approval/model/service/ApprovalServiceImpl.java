package com.workly.final_project.approval.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalDao;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;
import com.workly.final_project.leave.model.vo.LeaveHistory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ApprovalServiceImpl implements ApprovalService {
	
	@Autowired
	private ApprovalDao approvalDao;
	
	private final Map<String, Integer> previousCounts = new HashMap<>();

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


	@Override
	public List<Approval> getApprovalRequests(int userNo) {
		return approvalDao.getApprovalRequests(userNo);
	}

	@Override
	public List<Approval> getApprovalFinishList(int userNo) {
		return approvalDao.getApprovalFinishList(userNo);
	}

	@Override
	public List<Approval> getApprovalReference(int userNo) {
		return approvalDao.getApprovalReference(userNo);
	}

	@Override
	public List<Approval> getApprovalSendList(int userNo) {
		return approvalDao.getApprovalSendList(userNo);
	}

	
	// 팀원 추가
	@Override
	public int saveLeaveRequest(LeaveHistory leaveRequest) {
		return approvalDao.saveLeaveRequest(leaveRequest);
	}

	@Override
	@Transactional
	public void rejectApproval(int approvalNo) {
		 approvalDao.rejectApproval(approvalNo);
	}

	@Override
	@Transactional
	public void rejectApprovalLine(int approvalNo, int userNo) {
		 approvalDao.rejectApprovalLine(approvalNo, userNo);
	}

	@Override
	public List<Approval> getApprovalRejectList(int userNo) {
		return approvalDao.getApprovalRejectList(userNo);
	}

	@Override
	@Transactional
	public void ApprovalDelete(int approvalNo) {
		approvalDao.ApprovalDelete(approvalNo);
	}

	
	// 팀원 추가 끝
	
	//진행함
	@Override
    public List<Approval> getApprovalProgressList(int userNo) {
        return approvalDao.getApprovalProgressList(userNo);
    }



}

