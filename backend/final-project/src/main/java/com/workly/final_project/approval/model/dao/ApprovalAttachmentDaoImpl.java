package com.workly.final_project.approval.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalAttachment;

@Repository
public class ApprovalAttachmentDaoImpl implements ApprovalAttachmentDao{
	
	private final SqlSession sqlSession;
	
	@Autowired
	public ApprovalAttachmentDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public void saveAttachment(ApprovalAttachment attachment) {
		sqlSession.insert("ApprovalAttachment.saveAttachment", attachment);
	}
	
}
