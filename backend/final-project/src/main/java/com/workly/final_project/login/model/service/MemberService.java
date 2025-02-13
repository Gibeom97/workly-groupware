package com.workly.final_project.login.model.service;

import java.util.List;

import com.workly.final_project.login.model.vo.Member;

public interface MemberService {

	Member loginMember(Member m);

	List<Member> getMemberList();

}
