package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.Approval;

@Repository
public class ApprovalDaoImpl implements ApprovalDao{

	private final SqlSession sqlSession;
	
	@Autowired
	public ApprovalDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public int insertApproval(Approval approval) {
		int result = sqlSession.insert("Approval.insertApproval", approval);
		System.out.println("✅ Approval 저장 완료, approvalNo: " + approval.getApprovalNo());
		return result;
	}

	@Override
	public Approval selectApprovalById(int approvalNo) {
		return sqlSession.selectOne("Approval.selectApprovalById", approvalNo);
	}

	@Override
	public List<Approval> selectAllAPprovals() {
		return sqlSession.selectList("Approval.selectAllApprovals");
	}

	@Override
	public List<Approval> getAllApprovals() {
		// TODO Auto-generated method stub
		return null;
	}

}
