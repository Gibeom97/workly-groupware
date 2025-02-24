package com.workly.final_project.approval.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.service.ApprovalService;
import com.workly.final_project.approval.model.vo.Approval;


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
	
	// 임시저장된 결재 목록 조회 API
    @GetMapping("/drafts")
    public ResponseEntity<List<Approval>> getDraftApprovals() {
        List<Approval> draftApprovals = approvalService.getDraftApprovals();
        return ResponseEntity.ok(draftApprovals);
    }

    // 선택한 결재 문서 삭제 API
    @PostMapping("/delete")
    public ResponseEntity<?> deleteApprovals(@RequestBody Map<String, List<Long>> request) {
        List<Long> approvalNosLong = request.get("approvalNos");

        if (approvalNosLong == null || approvalNosLong.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "삭제할 문서 번호가 없습니다."));
        }

        // List<Long>을 List<Integer>로 변환
        List<Integer> approvalNos = approvalNosLong.stream()
            .map(Long::intValue)
            .toList();

        try {
            approvalService.deleteApprovals(approvalNos);
            return ResponseEntity.ok(Map.of("message", "삭제 완료"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "문서 삭제 중 오류 발생", "error", e.getMessage()));
        }
    }
    
    // 임시저장 생성 API
    @PostMapping("/tempSave")
    public ResponseEntity<Map<String, Object>> tempSaveApproval(@RequestBody Approval approval) {
        try {
            int result = approvalService.tempSaveApproval(approval);
            
            if (result > 0) {
                int approvalNo = approval.getApprovalNo(); // 저장된 문서의 approvalNo 추출
                Map<String, Object> response = new HashMap<>();
                response.put("message", "임시저장 완료");
                response.put("approvalNo", approvalNo);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "임시저장 실패"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "임시저장 실패", "error", e.getMessage()));
        }
    }

    // 임시저장 조회 API
    @GetMapping("/getApproval/{approvalNo}")
    public ResponseEntity<Approval> getApprovalByNo(@PathVariable int approvalNo) {
        Approval approval = approvalService.getApprovalByNo(approvalNo);
        if (approval != null) {
            return ResponseEntity.ok(approval);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



	
	
}

