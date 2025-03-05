package com.workly.final_project.member.model.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dao.MemberDao;
import com.workly.final_project.member.model.dto.ChangePwd;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.CategoryFilter;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
	
	private final MemberDao dao;
	private final PasswordEncoder passwordEncoder;

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
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
	    
		result = dao.insertAttachment(at);
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
	    
		result = dao.updateMember(m);
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
		
		return result;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateMember(Attachment at, Member m) {
		int result = dao.insertAttachment(at);
		
		result = dao.updateMember(m);
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
		
		return result;
	}
	
	@Override
	public int checkAttachment(Member m) {
		return dao.checkAttachment(m);
	}

	@Override
	public List<MemberDTO> selectModalMemberList() {
		return dao.selectModalMemberList();
	}

	@Override
	public boolean currentPwdCheck(int userNo, String currentPwd) {
		Member member = dao.currentPwdCheck(userNo);
        return passwordEncoder.matches(currentPwd, member.getUserPwd());
	}

	@Override
	public int updatePassword(ChangePwd changePwd) {
		String newPassword = passwordEncoder.encode(changePwd.getNewPwd());
		changePwd.setNewPwd(newPassword);
		return dao.updatePassword(changePwd);
	}

}
