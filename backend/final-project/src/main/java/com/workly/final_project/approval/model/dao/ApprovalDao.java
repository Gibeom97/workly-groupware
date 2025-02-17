package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.vo.Approval;

@Mapper
public interface ApprovalDao {
    
    List<Approval> getAllApprovals();
    
    Approval selectApprovalById(int approvalNo);
    
    int insertApproval(Approval approval);
    
    int updateApproval(Approval approval);
    
    int deleteApproval(int approvalNo);
}
