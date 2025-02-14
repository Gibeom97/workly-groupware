package com.workly.final_project.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.common.controller.PaginationController;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dto.MemberListDTO;
import com.workly.final_project.member.model.service.MemberService;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService service;
	private final PaginationController page;
	
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
	public MemberListDTO selectMemberList(
			@RequestParam int cPage
			) {
		PageInfo pi = page.pagination(cPage);
		
		List<Member> list = service.selectMemberList(pi);
		log.debug("list : {}", list);
		
		return new MemberListDTO(pi, list);
	}
	
	@CrossOrigin("http://localhost:5173")
	@PostMapping("/createMember")
	public ResponseEntity insertMember(
			@RequestBody Member m) {
		
		log.debug("m : {}", m);
		return null;
	}
	
}

