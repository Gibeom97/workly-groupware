package com.workly.final_project.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dao.MemberDao;
import com.workly.final_project.member.model.vo.Member;

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
	public List<Member> selectMemberList(PageInfo pi) {
		return dao.selectMemberList(pi);
	}
}
