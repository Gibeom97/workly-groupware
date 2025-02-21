package com.workly.final_project.leave.model.dto;

import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.leave.model.vo.AnnualLeave;
import com.workly.final_project.leave.model.vo.LeaveHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnualHistoryDTO {
	private LeaveHistory leaveHistory;
	private AnnualLeave annualLeave;
	private PageRow pr;
}
