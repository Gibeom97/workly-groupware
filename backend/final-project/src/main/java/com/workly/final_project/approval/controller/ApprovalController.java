package com.workly.final_project.approval.controller;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.workly.final_project.approval.model.service.ApprovalService;
import com.workly.final_project.approval.model.vo.Approval;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;
import com.workly.final_project.approval.model.vo.ApprovalLine;
import com.workly.final_project.approval.model.vo.ApprovalMemo;
import com.workly.final_project.common.utils.TimestampConverter;

@RestController
@RequestMapping("/api/approval")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalController {
	
	@Autowired
	private ApprovalService approvalService;
	
	// 1. 결재 문서 생성 API
	@PostMapping("/submit")
	public ResponseEntity<Map<String, Object>> submitApproval(@RequestBody Approval approval) {
		System.out.println("Received Approval: " + approval);
		int result = approvalService.createApproval(approval);
		if(result > 0) {
			int approvalNo = approval.getApprovalNo();
			
			Map<String, Object> response = new HashMap<>();
			response.put("message", "결재 문서 저장 완료");
			response.put("approvalNo", approvalNo);
			
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.badRequest().body(Map.of("message", "결재 문서 저장 실패"));
	}


	 @GetMapping("/list")
	    public List<Approval> getAllApprovals() {
	        List<Approval> approvals = approvalService.getAllApprovals();
	        System.out.println("결재 목록: " + approvals); // 로그 추가
	        return approvals;
	    }
	 
	 @GetMapping("/approvalLineList")
	 public List<Map<String, Object>> getDepartmentsWithEmployees(){
		 return approvalService.getDepartmentsWithEmployees();
	 }
	 
	 // 결재상신한 기안자 이름 가져오기
	 @GetMapping("/getWriteUser")
	 public ResponseEntity<Approval> getApprovalWriteUser(
			 @RequestParam int approvalNo
			 ){
		 Approval approval = approvalService.getApprovalWriteUser(approvalNo);
		 
		 return ResponseEntity.ok(approval);
		 
	 }
	 
	 // 결재상신 완료 후 상세페이지 approval 데이터 가져오기
	 @GetMapping("/getApprovalData")
	 public ResponseEntity<Approval> getApprovalData(
		 @RequestParam int approvalNo
			 ){
		 Approval approval = approvalService.getApprovalData(approvalNo);
		 return approval != null ? ResponseEntity.ok(approval) : ResponseEntity.notFound().build();
	 }
	 
	 // 결재상신 완료 후 상세페이지 approvalLine 데이터 가져오기
	 @GetMapping("/getApprovalLine")
	 public ResponseEntity<List<ApprovalLine>> getApprovalLine(
		@RequestParam int approvalNo
			 ){
		List <ApprovalLine> approvalLines = approvalService.getApprovalLine(approvalNo);
		
	    approvalLines.forEach(line ->
        line.setApprovalDate(TimestampConverter.convertOracleTimestamp(line.getApprovalDate()))
    );
		
		return ResponseEntity.ok(approvalLines);
	 }
	 
	 // 결재상신 완료 후 상세페이지 approvalAttachment 데이터 가져오기
	 @GetMapping("/getApprovalAttachments/{approvalNo}")
	 public ResponseEntity<List<Map<String, Object>>> getApprovalAttachments(@PathVariable int approvalNo){
		 
		 List<ApprovalAttachment> attachments = approvalService.getApprovalAttachmentByApprovalNo(approvalNo);
		 
		 if(attachments == null || attachments.isEmpty()) {
			 return ResponseEntity.notFound().build();
		 }
		 
		    // 파일 데이터를 Base64로 인코딩하여 반환
		    List<Map<String, Object>> fileDataList = attachments.stream()
		            .map(attachment -> {
		                Map<String, Object> fileData = new HashMap<>();
		                fileData.put("fileName", attachment.getOriginName());
		                fileData.put("fileData", Base64.getEncoder().encodeToString(attachment.getFileData())); // ✅ Base64 인코딩
		                return fileData;
		            })
		            .toList();
	        return ResponseEntity.ok(fileDataList);
	    }
	 
	 // 결재상신후 결재메모 가져오기
	 @GetMapping("/getApprovalReply")
	 public ResponseEntity<List<ApprovalMemo>> getApprovalMemo(
			 @RequestParam int approvalNo,
			 @RequestParam int userNo
			 ){
		 List<ApprovalMemo> approvalMemo = approvalService.getApprovalMemo(approvalNo, userNo);
		 
		 return ResponseEntity.ok(approvalMemo);
		 
	 }
	 

	 
	 
 
 
}



























