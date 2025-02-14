package com.workly.final_project.member.model.dto;

import java.util.List;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.vo.Member;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberListDTO {
	private PageInfo pageInfo;
	private List<Member> members;
}
