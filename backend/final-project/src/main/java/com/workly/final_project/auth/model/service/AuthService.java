package com.workly.final_project.auth.model.service;

import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.member.model.vo.Member;

public interface AuthService {
	int insertMember(Member m);

	User loadUserByUserName(Member m);

	int insertMember(Member m, Attachment at);

	int updateFailCount(Member m);

	void initFailCount(Member m);

	void updatePwd(Member m);

	String selectEmail(Member m);
}