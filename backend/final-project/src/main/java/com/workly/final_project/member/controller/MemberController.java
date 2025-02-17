package com.workly.final_project.member.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.member.model.dto.MemberDTO;
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
		int listCount = service.selectMemberCount();
		
		PageInfo pi = Util.pagination(cPage, listCount);
		
		List<Member> list = service.selectMemberList(pi);
		log.debug("list : {}", list);
		
		return new MemberListDTO(pi, list);
	}
	
	@CrossOrigin("http://localhost:5173")
	@PostMapping("/enroll")
	public ResponseEntity<Map<String, Object>> insertMember(
			@RequestPart("member") Member m,
			@RequestPart(value = "fileImg", required = false) MultipartFile fileImg
			) {
		log.debug("m : {}", m);
		
    	String serverPath = new File("src/main/resources/static/uploads/profile/").getAbsolutePath();
		ResponseEntity<Map<String, Object>> responseEntity = null;
		int result = 0;
		
		if(fileImg != null) {
			Map<String, String> fileInfo;
				
			try {
				fileInfo = Util.fileRename(fileImg, serverPath);
				
				Attachment at = Attachment.builder()
						  				  .originalName(fileInfo.get("originalName"))
						  				  .changeName(fileInfo.get("changeName"))
										  .filePath(fileInfo.get("filePath"))
			   			 				  .build();
				
				result = service.insertMember(m, at);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			result = service.insertMember(m);
		}
			
		if(result > 0) {
			Map<String, Object> map = new HashMap<>();
			map.put("msg", m.getUserNo() + " 사원이 생성되었습니다.");
			responseEntity = ResponseEntity.ok().body(map);
		} else {
			Map<String, Object> error = new HashMap<>();
			error.put("msg", "사원 생성을 실패하였습니다.");
			responseEntity =  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
	
		return responseEntity;
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/personnelDetail/{userNo}")
	public MemberDTO selectMember(
			@PathVariable int userNo
			) {
		return service.selectMember(userNo);
	}
	
	@CrossOrigin("http://localhost:5173")
	@PutMapping("/memberUpdate")
	public ResponseEntity<Map<String, Object>> updateMember(
			@RequestPart("member") Member m,
			@RequestPart(value = "fileImg", required = false) MultipartFile fileImg
			) {
		log.debug("m : {}", m);
		log.debug("fileImg: {}", fileImg);
		
    	String serverPath = new File("src/main/resources/static/uploads/profile/").getAbsolutePath();
    	
    	//파일 미선택은 없음 -> 파일변경 시 이전 파일 상태값 변경
    	//fileImg없으면 member만 update 시행
		
		return null;
	}
	
}

