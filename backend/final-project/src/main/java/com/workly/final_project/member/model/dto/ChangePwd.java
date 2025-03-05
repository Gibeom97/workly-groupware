package com.workly.final_project.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePwd {
	private int userNo;
	private String currentPwd;
	private String newPwd;

}
