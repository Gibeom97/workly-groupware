package com.workly.final_project.approval.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalActualLine {
	private int level;// 결재순서
	private int lineNo;// 즐찾된 결재라인 번호
	private int userNo; // 즐찾된 사람들
	private String type; // 결재자/참조자
	private String approvalType; //승인/수신
}
