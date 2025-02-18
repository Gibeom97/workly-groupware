package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalMemo;

@Repository
public class ApprovalMemoDaoImpl implements ApprovalMemoDao{
	
	@Autowired
	private final SqlSession sqlSession;
	
	public ApprovalMemoDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public int insertApprovalMemo(ApprovalMemo approvalMemo) {
		int result = sqlSession.insert("ApprovalMemo.insertApprovalMemo", approvalMemo);
        if (result > 0) {
            System.out.println("✅ ApprovalMemo 저장 완료, memoNo: " + approvalMemo.getMemoNo());
        } else {
            System.out.println("❌ ApprovalMemo 저장 실패");
        }
        
        return result;
	}

	@Override
	public List<ApprovalMemo> selectMemosByApprovalId(int approvalNo) {
		return sqlSession.selectList("ApprovalMemo.selectMemosByApprovalId", approvalNo);
	}

}
