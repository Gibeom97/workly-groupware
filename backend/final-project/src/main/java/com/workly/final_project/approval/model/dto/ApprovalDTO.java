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
    private int approvalNo;       // 기안 번호
    private int userNo;           // 기안자 번호 (FK)
    private String approvalType;  // 결재 종류 (일반, 연차 등)
    private int approvalStatus;   // 결재 상태 (1: 진행 중, 2: 승인, 3: 반려)
    private String approvalTitle; // 제목
    private String approvalContent; // 내용
    private Date startDate;       // 기안일
    private Date endDate;         // 최종 승인일
    private String approvalUser;  // 결재자 (승인하는 사람)
    private String userName;      // 기안자 이름 (member 테이블에서 가져옴)
}
