package com.workly.final_project.approval.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.vo.ApprovalAttachment;

@Mapper
public interface ApprovalAttachmentDao {

	void saveAttachment(ApprovalAttachment attachment);

}
