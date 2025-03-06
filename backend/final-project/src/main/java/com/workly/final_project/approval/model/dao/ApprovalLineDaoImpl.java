package com.workly.final_project.approval.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.ApprovalActualLine;
import com.workly.final_project.approval.model.vo.ApprovalFavoriteLine;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@Repository
public class ApprovalLineDaoImpl implements ApprovalLineDao{
	
	@Autowired
	private final SqlSession sqlSession;
	
	public ApprovalLineDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public void saveApprovalLine(List<ApprovalLine> approvalLines) {
		sqlSession.insert("ApprovalLine.saveApprovalLine", approvalLines);
	}


	@Override
	public int saveFavoriteInfo(ApprovalFavoriteLine favoriteLineInfo) {	
		return sqlSession.insert("ApprovalLine.saveFavoriteInfo", favoriteLineInfo);
	}

	@Override
	public void saveFavoriteLine(List<ApprovalActualLine> approvalLines) {
		sqlSession.insert("ApprovalLine.saveFavoriteLine", approvalLines);
	}

	@Override
	public List<Map<String, Object>> getFavoriteLinesByUserNo(int userNo) {
		return sqlSession.selectList("ApprovalLine.getFavoriteLinesByUserNo", userNo);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void deleteFavoriteLine(int userNo, String favoriteName) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("userNo", userNo);
		paramMap.put("favoriteName", favoriteName);
		
		int deletedCount = sqlSession.delete("ApprovalLine.deleteFavoriteLine", paramMap);
		System.out.println("paramMap: " + paramMap);
	    System.out.println("삭제된 행 수: " + deletedCount);	
	}

	@Override
	public void updateApprovalStatus(int approvalNo, int userNo, int status) {
		Map<String, Object> params = new HashMap<>();
		params.put("approvalNo", approvalNo);
		params.put("userNo", userNo);
		params.put("status", status);
		
		sqlSession.update("ApprovalLine.updateApprovalStatus", params);
	}

	@Override
	public Map<String, Object> findNextApprover(int approvalNo, int nextLevel) {
        Map<String, Object> params = new HashMap<>();
        params.put("approvalNo", approvalNo);
        params.put("nextLevel", nextLevel);
		return sqlSession.selectOne("ApprovalLine.findNextApprover", params);
	}

	@Override
	public int findApprovalLevel(int approvalNo, int userNo) {
		Map<String, Object> params = new HashMap<>();
		params.put("approvalNo", approvalNo);
		params.put("userNo", userNo);
		
		return sqlSession.selectOne("ApprovalLine.findApprovalLevel", params);
	}

	@Override
	public int isFinalApprover(int approvalNo) {
		return sqlSession.selectOne("ApprovalLine.isFinalApprover", approvalNo);
	}

	@Override
	public void updateFinalApproval(int approvalNo) {
		sqlSession.update("ApprovalLine.updateFinalApproval", approvalNo);
	}

	// 결재라인 1번인 사람이 수신일경우 결재문서 바로 승인완료로 저장
	@Override
	public void updateApprovalTypeToApproved(List<Integer> approvalNosToUpdate) {
		sqlSession.update("ApprovalLine.updateApprovalTypeToApproved", approvalNosToUpdate);
	}

	@Override
	public String selectApprovalType(int approvalNo) {
		return sqlSession.selectOne("ApprovalLine.selectApprovalType", approvalNo);
	}

	@Override
	public double selectLeaveDays(int approvalNo) {
		return sqlSession.selectOne("ApprovalLine.selectLeaveDays", approvalNo);
	}

	@Override
	public void updateAnnualLeave(int userNo, double leaveDays) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("leaveDays", leaveDays);
		sqlSession.update("ApprovalLine.updateAnnualLeave", map);		
	}

	@Override
	public int selectApprovalUserNo(int approvalNo) {
		return sqlSession.selectOne("ApprovalLine.selectApprovalUserNo", approvalNo);
	}
}
























