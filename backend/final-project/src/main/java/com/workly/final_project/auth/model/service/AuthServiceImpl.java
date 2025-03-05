package com.workly.final_project.auth.model.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.workly.final_project.auth.model.dao.AuthDao;
import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final AuthDao dao;
	private final PasswordEncoder passwordEncoder;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertMember(Member m) {
		String pwd = m.getUserPwd();
		String password = passwordEncoder.encode(pwd);
		m.setUserPwd(password);
		
		int result = dao.insertMember(m);
		
		result = dao.insertLeave(m);
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
		
		return result; 
	}
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertMember(Member m, Attachment at) {
		String pwd = m.getUserPwd();
		String password = passwordEncoder.encode(pwd);
		m.setUserPwd(password);
		
		int result = dao.insertMember(m);
		
		result = dao.insertLeave(m);
		if(result == 0) {
		    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		    return 0;
		}
		
		at.setRefUserNo(m.getUserNo());
		result = dao.insertAttachment(at);
	    if(result == 0) {
	        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	        return 0;
	    }
		return result;
	}

	@Override
	public User loadUserByUserName(Member m) {
		boolean verify = verifyPassword(m.getUserNo(), m.getUserPwd());
		
		User user = null;
		
		if(verify) {
			user = dao.loadUserByUserName(m);
			user.setUserPwd("");
		}
		
		return user;
	}
	
    public boolean verifyPassword(int userNo, String userPwd) {
        Member member = dao.findByUserNo(userNo);
        return passwordEncoder.matches(userPwd, member.getUserPwd());
    }

    @Transactional(rollbackFor = Exception.class)
	@Override
	public int updateFailCount(Member m) {
		int userNo = m.getUserNo();
		int result = dao.updateFailCount(userNo);
		
		if(result <= 0) {
			  TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			  return 0;
		}
		
		result = dao.selectFailCount(userNo);
		return result;
	}

	@Override
	public void initFailCount(Member m) {
		dao.initFailCount(m);
	}

	@Override
	public void updatePwd(Member m) {
		String changePwd = passwordEncoder.encode(m.getUserPwd());
		m.setUserPwd(changePwd);
		dao.updatePwd(m);
	}

	@Override
	public String selectEmail(Member m) {
		return dao.selectEmail(m);
	}
}