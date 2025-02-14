package com.workly.final_project.member.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberDaoImpl implements MemberDao {
	
	private final SqlSession session;
	private final PageRow pr;
	@Override
	public Member loginMember(Member m) {
		return session.selectOne("member.loginMember", m);
	}

	@Override
	public List<Member> selectMemberList(PageInfo pi) {
		int startRow = (pi.getCurrentPage() - 1) * pi.getContentsLimit() + 1;
		int endRow = startRow + pi.getContentsLimit() - 1;
	
		pr.setStartRow(startRow);
		pr.setEndRow(endRow);
		
		return session.selectList("member.selectMemberList", pr);
	}
}
