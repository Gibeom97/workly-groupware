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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.member.model.dto.ChangePwd;
import com.workly.final_project.member.model.dto.DeptPositionListDTO;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.dto.MemberListDTO;
import com.workly.final_project.member.model.service.MemberService;
import com.workly.final_project.member.model.vo.CategoryFilter;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService service;
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/personnel")
	public MemberListDTO selectSearchMemberList(
			@RequestParam int cPage,
			@RequestParam String dept,
			@RequestParam String position,
			@RequestParam String status,
			@RequestParam String name
			) {
		dept = dept.equals("0") ? null : dept;
		position = position.equals("0") ? null : position; 
		status = status.equals("0") ? null : status;
		
		CategoryFilter filter = new CategoryFilter(dept, position, status, name);
		log.debug("filter: {}", filter);
		
		int listCount = service.selectMemberCount(filter);
		log.debug("listCount : {}", listCount);
		
		PageInfo pi = Util.pagination(cPage, listCount);
		List<Member> list = service.selectMemberList(pi, filter);
		log.debug("list : {}", list);
		
		return new MemberListDTO(pi, list);
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/personnelDetail/{userNo}")
	public MemberDTO selectMember(
			@PathVariable int userNo
			) {
		return service.selectMember(userNo);
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/dept-posi")
	public DeptPositionListDTO selectDeptPosiList() {
		List<Department> deptList = service.selectDeptList();
		List<Position> posiList = service.selectPosiList();	
		
		return new DeptPositionListDTO(deptList, posiList);
	}
	
	@CrossOrigin("http://localhost:5173")
	@PutMapping("/memberUpdate")
	public ResponseEntity<Map<String, Object>> updateMember(
			@RequestPart("member") Member m,
			@RequestPart(value = "fileImg", required = false) MultipartFile fileImg
			) {
		log.debug("m : {}", m);
		log.debug("fileImg: {}", fileImg);
		
		if(m.getDeptNo() == 2) {
			m.setRole("ROLE_HR");
		} else {
			m.setRole("ROLE_USER");
		}
		
    	String serverPath = new File("src/main/resources/static/uploads/profile/").getAbsolutePath();
    	log.debug("serverPath : {}", serverPath);
    	
		ResponseEntity<Map<String, Object>> responseEntity = null;
		int result = 0;
		
		if(fileImg != null) {
			Map<String, String> fileInfo;
				
			try {
				fileInfo = Util.fileRename(fileImg, serverPath);
				
				Attachment at = Attachment.builder()
						  				  .originalName(fileInfo.get("originalName"))
						  				  .changeName(fileInfo.get("changeName"))
										  .filePath("/uploads/profile/")
										  .refUserNo(m.getUserNo())
			   			 				  .build();
				
				result = service.checkAttachment(m);
				
				if(result > 0) {
					result = service.updateMember(m, at); // 기존 첨부파일 N 처리 메서드 포함
				} else {
					result = service.updateMember(at, m); // 기존 첨부파일 N 처리 메서드 미포함
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			result = service.updateMember(m);
		}
		
		if(result > 0) {
			Map<String, Object> map = new HashMap<>();
			map.put("msg", m.getUserNo() + " 사원정보가 변경되었습니다.");
			responseEntity = ResponseEntity.ok().body(map);
		} else {
			Map<String, Object> error = new HashMap<>();
			error.put("msg", "사원정보 변경을 실패하였습니다.");
			responseEntity =  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
	
		return responseEntity;
	}
	
	@CrossOrigin("http://localhost:5173")
	@GetMapping("/memberSearch")
	public List<MemberDTO> selectModalMemberList() {
		return service.selectModalMemberList();
	}

	@CrossOrigin("http://localhost:5173")
	@PutMapping("/changePwd")
	public ResponseEntity<Map<String, Object>> updatePwd(
			@RequestBody ChangePwd changePwd
			) {
		Map<String, Object> map = new HashMap<>();

		boolean currentPwdCheck = service.currentPwdCheck(changePwd.getUserNo(), changePwd.getCurrentPwd());
			if(!currentPwdCheck) {
				log.debug("currentPwdCheck: {}",currentPwdCheck);
				map.put("msg", "현재 비밀번호가 일치하지 않습니다.");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
			}
		
		int result = service.updatePassword(changePwd);
		if(result > 0) {
			map.put("msg", "비밀번호가 변경되었습니다.");
			return ResponseEntity.ok().body(map);
		}
		map.put("msg", "비밀번호 변경에 실패했습니다.");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	}
}

