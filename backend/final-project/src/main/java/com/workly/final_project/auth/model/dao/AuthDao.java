package com.workly.final_project.auth.model.dao;

import org.springframework.security.core.userdetails.UserDetails;

import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.member.model.vo.Member;

public interface AuthDao {

	int insertMember(Member m);

	User loadUserByUserName(Member m);

	Member findByUserNo(int userNo);

	UserDetails loadUserByUserName(String username);

	int insertLeave(Member m);

	int insertAttachment(Attachment at);
}

