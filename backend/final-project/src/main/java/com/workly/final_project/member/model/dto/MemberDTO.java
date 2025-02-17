package com.workly.final_project.member.model.dto;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
	private Member member;
	private Department department;
	private Position position;
	private Attachment attachment;
}
