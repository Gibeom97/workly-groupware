package com.workly.final_project.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dao.MemberDao;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.CategoryFilter;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	
	private final MemberDao dao;

	@Override
	public MemberDTO loginMember(Member m) {
		return dao.loginMember(m);
	}

	@Override
	public int selectMemberCount(CategoryFilter filter) {
		return dao.selectMemberCount(filter);
	}

	@Override
	public List<Member> selectMemberList(PageInfo pi, CategoryFilter filter) {
		return dao.selectMemberList(pi, filter);
	}

	@Override
	public int insertMember(Member m) {
		return dao.insertMember(m);
	}
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertMember(Member m, Attachment at) {
		int result = dao.insertMember(m);
		
		if(result > 0) {
			at.setRefUserNo(m.getUserNo());
			
			result = dao.insertAttachment(at); 
		}
		return result;
	}

	@Override
	public MemberDTO selectMember(int userNo) {
		return dao.selectMember(userNo);
	}

	@Override
	public List<Department> selectDeptList() {
		return dao.selectDeptList();
	}

	@Override
	public List<Position> selectPosiList() {
		return dao.selectPosiList();
	}

	@Override
	public int updateMember(Member m) {
		return dao.updateMember(m);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateMember(Member m, Attachment at) {
		int result = dao.deleteAttachment(m);
		
		if(result > 0) {
			result = dao.insertAttachment(at);
			
			if(result > 0) result = dao.updateMember(m);
		}
		
		return result;
	}

	@Override
	public int checkAttachment(Member m) {
		return dao.checkAttachment(m);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateMember(Attachment at, Member m) {
		int result = dao.insertAttachment(at);
		
		if(result > 0) result = dao.updateMember(m);
		
		return result;
	}
}
