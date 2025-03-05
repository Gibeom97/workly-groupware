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
	private String approvalUser;//기안자
	private String userConfirm;// 기안자가 완료, 반려 문서 읽었는지 여부
	
	// 다른 테이블 컬럼 필요하여 추가
	private int status;
	private String type;
	
	private String userName; // ✅ 추가: 조인된 userName을 받을 필드
	
}
