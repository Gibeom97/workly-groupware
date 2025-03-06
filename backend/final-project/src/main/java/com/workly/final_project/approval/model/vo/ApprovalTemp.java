package com.workly.final_project.approval.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalTemp {

	private int tempNo;
	private int userNo;
	private String approvalType;
	private int approvalStatus;
	private String approvalTitle;
	private String approvalContent;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private Date startDate;
	private int approvalNo; // 추후 상신 시 발생
}
