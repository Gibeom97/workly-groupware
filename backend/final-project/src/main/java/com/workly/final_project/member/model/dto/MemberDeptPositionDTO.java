package com.workly.final_project.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberDeptPositionDTO {
	// chat에서 사원 부서명, 직급명 가져오는데 사용하는 class
	private int userNo;
	private String userName;
	private String deptName;
	private String positionName;
}
