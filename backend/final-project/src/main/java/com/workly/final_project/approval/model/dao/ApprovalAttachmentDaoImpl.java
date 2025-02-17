package com.workly.final_project.approval.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalAttachment;

@Repository
public class ApprovalAttachmentDaoImpl implements ApprovalAttachmentDao{
	
	@Autowired
	private final SqlSession sqlSession;
	
	public ApprovalAttachmentDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public void saveAttachment(ApprovalAttachment attachment) {
		sqlSession.insert("ApprovalAttachment.saveAttachment", attachment);
	}
	
}
