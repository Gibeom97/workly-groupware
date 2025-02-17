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
public class ApprovalMemo {
	private int memoNo;
	private int userNo;
	private int approvalNo;
	private String memoContent;
	private Date memoDate;
}
