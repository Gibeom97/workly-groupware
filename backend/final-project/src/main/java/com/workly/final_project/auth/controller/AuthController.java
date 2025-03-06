package com.workly.final_project.auth.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.auth.model.jwt.JwtTokenProvider;
import com.workly.final_project.auth.model.service.AuthService;
import com.workly.final_project.common.model.service.EmailService;
import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final JwtTokenProvider jwtProvider;
	private final AuthService service;
	private final EmailService emailService;
	
	@PostMapping("/login")
	public ResponseEntity<HashMap<String, Object>> login(
			@RequestBody Member m
			) {
	    User user = service.loadUserByUserName(m);
	    
	    HashMap<String, Object> map = new HashMap<>();
	    if(user != null) {
	    	service.initFailCount(m);  
	    	String jwtToken = jwtProvider.createToken(user);
	    	map.put("user", user);
	    	map.put("jwtToken", jwtToken);
	    	return ResponseEntity.ok(map); 
	    } else {
	    	int failCount = service.updateFailCount(m);
	    	if(failCount == 0) {
	    		map.put("msg", "계정 정보가 일치하지 않습니다.");
	    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	    	}
	    	
	    	if(failCount == 5) {
	    		map.put("msg", "5회 이상 로그인에 실패하였습니다. 이메일로 임시 비밀번호를 발송합니다.");
	    		map.put("failCount", failCount);
	    		
	    		String changePwd = UUID.randomUUID().toString().substring(0, 8);
	    		m.setUserPwd(changePwd);
	    		service.updatePwd(m);
	    		
	    		String email = service.selectEmail(m);
	    		String subject = "[Workly] 비밀번호 변경 알림";
	    		String text = "안녕하세요. Workly입니다.\n로그인 시도 횟수 초과로 임시 비밀번호를 안내드리오니 로그인 후 비밀번호를 변경해주세요. \n임시비밀번호: " + changePwd;
	    		emailService.sendMail(email, subject, text);
	    		
		    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	    	} else if(failCount < 5) {
	    		map.put("msg", "계정 정보가 일치하지 않습니다.");
	    		map.put("failCount", failCount);
	    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	    	} else {
	    		map.put("msg", "5회 이상 로그인에 실패하여 이메일로 임시 비밀번호가 발송되었습니다.");
	    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	    	}
	    }
	}
	
	@PostMapping("/enroll")
	public ResponseEntity<Map<String, Object>> insertMember(
			@RequestPart("member") Member m,
			@RequestPart(value = "fileImg", required = false) MultipartFile fileImg
			) {
		String serverPath = System.getProperty("user.dir") + "/src/main/resources/static/uploads/profile/";
		int result = 0;
		ResponseEntity<Map<String, Object>> responseEntity = null;
		
		if(fileImg != null) {
			Map<String, String> fileInfo;
			try {
				fileInfo = Util.fileRename(fileImg, serverPath);
			
				Attachment at = Attachment.builder()
					  				  .originalName(fileInfo.get("originalName"))
					  				  .changeName(fileInfo.get("changeName"))
									  .filePath("/uploads/profile/")
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
}
