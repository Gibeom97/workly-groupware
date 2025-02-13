package com.workly.final_project.login.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.workly.final_project.login.model.dao.MemberDao;
import com.workly.final_project.login.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	
	private final MemberDao dao;

	@Override
	public Member loginMember(Member m) {
		return dao.loginMember(m);
	}

	@Override
	public List<Member> getMemberList() {
		return dao.getMemberList();
	}
}
