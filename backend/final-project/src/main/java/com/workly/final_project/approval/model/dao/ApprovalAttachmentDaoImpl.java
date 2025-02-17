package com.workly.final_project.approval.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalAttachment;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
@Primary
public class ApprovalAttachmentDaoImpl implements ApprovalAttachmentDao {
	
	private final SqlSession sqlSession;

	@Override
	public void saveAttachment(ApprovalAttachment attachment) {
		sqlSession.insert("ApprovalAttachment.saveAttachment", attachment);
	}
}
