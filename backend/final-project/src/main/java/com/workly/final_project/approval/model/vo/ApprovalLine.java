package com.workly.final_project.approval.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalLine {
	
	private int approvalLevel;
	private int approvalNo;
	private int userNo;
	private String type;
	private int status;
	private String confirmStatus;
	private Date approvalDate;
	private String approvalLineType;

}
