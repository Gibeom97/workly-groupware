package com.workly.final_project.auth.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AuthDaoImpl implements AuthDao {
	private final SqlSession session;
	
	@Override
	public int insertMember(Member m) {
		return session.insert("auth.insertMember", m);
	}

	@Override
	public User loadUserByUserName(Member m) { // 로그인 시 유저 정보 반환
		return session.selectOne("auth.loginMember", m);
	}

	@Override
	public Member findByUserNo(int userNo) { // 로그인 시 비밀번호 검사
		return session.selectOne("auth.findByUserNo", userNo);
	}

	@Override
	public UserDetails loadUserByUserName(String userNo) {
		return session.selectOne("auth.loadUserByUserName", userNo);
	}

	@Override
	public int insertLeave(Member m) {
		return session.insert("auth.insertLeave", m);
	}

	@Override
	public int insertAttachment(Attachment at) {
		return session.insert("auth.insertAttachment", at);
	}

}
