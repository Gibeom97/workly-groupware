package com.workly.final_project.approval.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalAttachment {
	private int fileNo;
	private int approvalNo;
	private int refNo;
	private String originName;
	private String changeName;
	private byte[] fileData; // 파일 데이터를 BLOB 형태로 저장
}
