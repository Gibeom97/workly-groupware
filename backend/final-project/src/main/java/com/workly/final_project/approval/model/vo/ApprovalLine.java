package com.workly.final_project.approval.model.vo;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Timestamp approvalDate;
	private String approvalLineType;

	private String userName;
	private String deptName;
	private String positionName;
}
