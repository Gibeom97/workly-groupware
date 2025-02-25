package com.workly.final_project.leave.model.dto;

import com.workly.final_project.leave.model.vo.AnnualLeave;
import com.workly.final_project.leave.model.vo.LeaveHistory;
import com.workly.final_project.member.model.vo.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeaveDetailDTO {
	private Member member;
	private LeaveHistory leaveHistory;
	private AnnualLeave annualLeave;
}
