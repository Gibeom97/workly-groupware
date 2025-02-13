package com.workly.final_project.login.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.login.model.service.MemberService;
import com.workly.final_project.login.model.vo.Member;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
	
	private final MemberService service;
	
	@CrossOrigin(origins = {"http://localhost:5173"})
	@PostMapping("/login")
	public Member login(HttpServletResponse response) {
//		service.login();
		return null;
	}
}

