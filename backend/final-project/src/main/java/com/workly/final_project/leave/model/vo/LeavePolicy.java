package com.workly.final_project.leave.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeavePolicy {
	private int policyNo;
	private int minYear;
	private int maxYear;
	private int leaveDays;
}
