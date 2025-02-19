package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	

}
