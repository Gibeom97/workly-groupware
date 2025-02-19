package com.workly.final_project.approval.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.Approval;

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

}
