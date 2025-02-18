package com.workly.final_project.member.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
	private int userNo;
	private int statusType;
	private int positionNo;
	private int deptNo;
	private int totalLeaveDays;
	private String status;
	private String userPwd;
	private String userName;
	private String phone;
	private String extension;
	private String email;
	private String address;
	private String addressDetail;
	private Date hireDate;
	private Date updateDate;
}
