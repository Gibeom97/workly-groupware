package com.workly.final_project.leave.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnualLeave {
	private int year;
	private int userNo;
	private int totalAnnualLeave;
	private double usedAnnualLeave;
}
