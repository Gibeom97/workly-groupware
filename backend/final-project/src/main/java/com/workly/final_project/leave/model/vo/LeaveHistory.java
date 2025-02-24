package com.workly.final_project.leave.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeaveHistory {
	private int leaveNo;
	private int userNo;
	private Date startDate;
	private Date endDate;
	private double leaveDays;
	private String leaveType;
	private String leaveStatus;
}
