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
public class Approval {
	private int approvalNo;
	private int userNo;//기안자
	private String approvalType;
	private int approvalStatus;
	private String approvalTitle;
	private String approvalContent;
	private Date startDate;//요청 날짜
	private Date endDate;// 최종승인 날짜
	private String approvalUser;//결재해주는사람
	
	private String userName;
	private int status;
	private String type;
	
}
