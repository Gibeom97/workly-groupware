package com.workly.final_project.login.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.login.model.service.MemberService;
import com.workly.final_project.login.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService service;
	
	@CrossOrigin("http://localhost:5173")
	@PostMapping("/login")
	public ResponseEntity<?> login( // 로그인 성공, 실패 시 반환타입 다르므로 제네릭 와일드카드로 설정 
			@RequestBody Member m) {
		log.debug("m : {}", m);
		Member loginMember= service.loginMember(m);
		log.debug("loginMember: {}", loginMember);
		
		if(loginMember != null) {
			return ResponseEntity.ok().body(loginMember);
		} else {
			Map<String, Object> error = new HashMap<>();
			error.put("msg", "계정 정보가 일치하지 않습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/personnel")
	public List<Member> getMemberList() {
		List<Member> list = service.getMemberList();
		
		log.debug("list : {} ", list);
		
		return list;
	}
}

