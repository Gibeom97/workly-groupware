package com.workly.final_project.approval.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;
import com.workly.final_project.leave.model.vo.LeaveHistory;

@Repository
public class ApprovalDaoImpl implements ApprovalDao{

	@Autowired
	private final SqlSession sqlSession;
	
	public ApprovalDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public int insertApproval(Approval approval) {
		int result = sqlSession.insert("Approval.insertApproval", approval);
		System.out.println("✅ Approval 저장 완료, ApprovalNo: " + approval.getApprovalNo());
		System.out.println("받아온 userNo값:" + approval.getUserNo());
		return result;
	}

	@Override
	public Approval selectApprovalById(int approvalNo) {
		return sqlSession.selectOne("Approval.selectApprovalById", approvalNo);
	}


	@Override
	public List<Approval> getAllApprovals() {
		return sqlSession.selectList("Approval.getAllApprovals");
	}

	@Override
	public List<Map<String, Object>> getDepartmentsWithEmployees() {
		return sqlSession.selectList("Approval.getDepartmentsWithEmployees");
	}


	// Approval_Status = 4인 데이터만 조회
	@Override
	public List<Approval> getDraftApprovals() {
		return sqlSession.selectList("Approval.getDraftApprovals");
	}

	 // 선택한 문서 삭제
	public int deleteApprovals(List<Integer> approvalNos) {
		return sqlSession.delete("Approval.deleteApprovals", approvalNos);
	}

	@Override
	public int insertTempApproval(Approval approval) {
	    return sqlSession.insert("Approval.insertTempApproval", approval);
	}

	@Override
	public Approval getApprovalByNo(int approvalNo) {
	    return sqlSession.selectOne("Approval.getApprovalByNo", approvalNo);
	}

	@Override
	public Approval getApprovalData(int approvalNo) {
		
		return sqlSession.selectOne("Approval.getApprovalData", approvalNo);
	}

	@Override
	public List<ApprovalLine> getApprovalLine(int approvalNo) {
		
		return sqlSession.selectList("Approval.getApprovalLine", approvalNo);
	}

	@Override
	public List<ApprovalAttachment> getApprovalAttachmentByApprovalNo(int approvalNo) {
		return sqlSession.selectList("Approval.getApprovalAttachmentByApprovalNo", approvalNo);
	}

	@Override
	public List<ApprovalMemo> getApprovalMemo(int approvalNo, int userNo) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("userNo", userNo);
		
		return sqlSession.selectList("Approval.getApprovalMemo", paramMap);
	}

	@Override
	public Approval getApprovalWriteUser(int approvalNo) {
		
		return sqlSession.selectOne("Approval.getApprovalWriteUser", approvalNo);
	}


	@Override
	public List<Approval> getApprovalRequests(int userNo) {
		return sqlSession.selectList("Approval.getApprovalRequests", userNo);
	}

	@Override
	public List<Approval> getApprovalFinishList(int userNo) {
		return sqlSession.selectList("Approval.getApprovalFinishList", userNo);
	}

	@Override
	public List<Approval> getApprovalReference(int userNo) {
		return sqlSession.selectList("Approval.getApprovalReference", userNo);
	}

	@Override
	public List<Approval> getApprovalSendList(int userNo) {
		return sqlSession.selectList("Approval.getApprovalSendList", userNo);
	}

	// 팀원 추가
	@Override
	public int saveLeaveRequest(LeaveHistory leaveRequest) {
		return sqlSession.insert("Approval.saveLeaveRequest", leaveRequest);
	}

	@Override
	public Object rejectApproval(int approvalNo) {
		return sqlSession.update("Approval.rejectApproval", approvalNo);
	}

	@Override
	public Object rejectApprovalLine(int approvalNo, int userNo) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("approvalNo", approvalNo);
		paramMap.put("userNo", userNo);
		
		return sqlSession.update("Approval.rejectApprovalLine", paramMap);
	}

	@Override
	public List<Approval> getApprovalRejectList(int userNo) {
		return sqlSession.selectList("Approval.getApprovalRejectList", userNo);
	}

	@Override
	public void ApprovalDelete(int approvalNo) {
		sqlSession.delete("Approval.ApprovalDelete", approvalNo);
	}
	
	// 팀원 추가 끝
	
	

}
