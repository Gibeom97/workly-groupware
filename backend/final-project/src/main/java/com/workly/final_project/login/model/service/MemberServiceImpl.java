package com.workly.final_project.login.model.service;

import org.springframework.stereotype.Service;

import com.workly.final_project.login.model.dao.MemberDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberDao dao;
}
