package com.workly.final_project.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dao.MemberDao;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
	
	private final MemberDao dao;

	@Override
	public Member loginMember(Member m) {
		return dao.loginMember(m);
	}

	@Override
	public int selectMemberCount() {
		return dao.selectMemberCount();
	}

	@Override
	public List<Member> selectMemberList(PageInfo pi) {
		return dao.selectMemberList(pi);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertMember(Member m, Attachment at) {
		int result = dao.insertMember(m);
		
		if(result > 0) {
			at.setRefUserNo(m.getUserNo());
			
			result = dao.insertAttchment(at); 
		}
		return result;
	}

	@Override
	public int insertMember(Member m) {
		return dao.insertMember(m);
	}

	@Override
	public MemberDTO selectMember(int userNo) {
		return dao.selectMember(userNo);
	}
}
