package com.workly.final_project.login.model.dao;

import java.util.List;

import com.workly.final_project.login.model.vo.Member;

public interface MemberDao {

	Member loginMember(Member m);

	List<Member> getMemberList();

}
