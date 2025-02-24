package com.workly.final_project.approval.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalDTO {
    private int approvalNo;
    private int userNo;
    private String approvalType;
    private String approvalStatus;
    private String approvalTitle;
    private String approvalContent;
    private Date startDate;
    private Date endDate;
    private String approvalUser;
	
	
}
