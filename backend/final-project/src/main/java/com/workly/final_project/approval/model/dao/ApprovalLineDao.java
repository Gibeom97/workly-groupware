package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.vo.ApprovalLine;

@Mapper
public interface ApprovalLineDao {

	void saveApprovalLine(List<ApprovalLine> approvalLines);

}
