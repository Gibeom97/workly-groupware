package com.workly.final_project.member.model.service;

import java.util.List;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.vo.Member;

public interface MemberService {

	Member loginMember(Member m);

	List<Member> selectMemberList(PageInfo pi);

}
