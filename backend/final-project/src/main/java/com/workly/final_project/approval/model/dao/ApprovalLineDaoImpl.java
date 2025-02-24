package com.workly.final_project.approval.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
}
