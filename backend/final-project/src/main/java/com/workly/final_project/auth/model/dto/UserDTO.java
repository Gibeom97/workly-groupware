package com.workly.final_project.auth.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
	private int userNo;
	private int statusType;
	private String userName;
	private int deptNo;
	private String deptName;
	private int positionNo;
	private String positionName;
	private String changeName;
	private String filePath;
	private String totalAnnualLeave;
	private String usedAnnualLeave;
	private Date hireDate;
	private Date updateDate;
	private String role;
	private String userPwd;
}
