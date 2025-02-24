package com.workly.final_project.approval.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.service.ApprovalLineService;
import com.workly.final_project.approval.model.vo.ApprovalActualLine;
import com.workly.final_project.approval.model.vo.ApprovalFavoriteLine;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@RestController
@RequestMapping("/api/approval")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalLineController {
	
	@Autowired
	private ApprovalLineService service;

	// 결재라인 저장 API
	@PostMapping("saveApprovalLine")
	public ResponseEntity<String> saveApprovalLine(@RequestBody List<ApprovalLine> approvalLines){
		System.out.println("받아온 라인값:" + approvalLines);
		service.saveApprovalLine(approvalLines);
		return ResponseEntity.ok("결재라인이 저장완료");
	}
	
	// 즐겨찾기 정보 저장(LINE_NO자동 생성)
	@PostMapping("/saveFavoriteInfo")
	public ResponseEntity<Integer>saveFavoriteInfo(@RequestBody ApprovalFavoriteLine favoriteLineInfo){
        int lineNo = service.saveFavoriteInfo(favoriteLineInfo);
        return ResponseEntity.ok(lineNo);
		
	}
	
	// 즐겨찾기 결재라인 저장
	@PostMapping("/saveFavoriteLine")
	public ResponseEntity<String> saveFavoriteLine(@RequestBody List<ApprovalActualLine> approvalLines){
		System.out.println("받은 데이터 값:"+approvalLines);
		service.saveFavoriteLine(approvalLines);
		return ResponseEntity.ok("즐겨찾기 결재라인 저장 완료");
		
	}
	
	// 즐겨찾기 리스트 불러오기
	@GetMapping("/getFavoriteLines/{userNo}")
	public List<Map<String, Object>> getFavoriteLinesByUserNo(@PathVariable int userNo){
		return service.getFavoriteLinesByUserNo(userNo);
	}
	
	// 즐겨찾기 리스트 삭제
	 @DeleteMapping("/deleteFavoriteLine")
	 public ResponseEntity<String> deleteFavoriteLine(
			 @RequestParam("userNo") int userNo,
			 @RequestParam("favoriteName") String favoriteName){
		 
		 favoriteName = URLDecoder.decode(favoriteName, StandardCharsets.UTF_8);
		 
		 System.out.println("받아온 값:"+userNo + favoriteName);
		 try {
	        service.deleteFavoriteLine(userNo, favoriteName);
	        return ResponseEntity.ok("즐겨찾기 삭제 성공");
		 } catch (Exception e) {
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("즐겨찾기 삭제 실패");
		 }
	 }
}
