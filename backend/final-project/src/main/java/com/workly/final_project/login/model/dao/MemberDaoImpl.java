package com.workly.final_project.login.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.login.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberDaoImpl implements MemberDao {
	
	private final SqlSession session;

	@Override
	public Member loginMember(Member m) {
		return session.selectOne("member.loginMember", m);
	}

	@Override
	public List<Member> getMemberList() {
		return session.selectList("member.getMemberList");
	}
}
