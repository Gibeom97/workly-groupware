package com.workly.final_project.approval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.workly.final_project.approval.model.service.ApprovalTempService;
import com.workly.final_project.approval.model.vo.ApprovalTemp;

@RestController
@RequestMapping("/api/approvalTemp")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalTempController {

	private static final Logger log = LoggerFactory.getLogger(ApprovalTempController.class);
	
	@Autowired
	private ApprovalTempService service;
	
	@PostMapping("/save")
    public ResponseEntity<String> saveTempApproval(@RequestBody ApprovalTemp approvalTemp) {
        service.saveTempApproval(approvalTemp);
        return ResponseEntity.ok("임시 저장 완료");
    }

    @GetMapping("/list/{userNo}")
    public ResponseEntity<List<ApprovalTemp>> getTempApprovalsByUser(@PathVariable int userNo) {
        return ResponseEntity.ok(service.getTempApprovalsByUser(userNo));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteTempApprovals(@RequestParam("tempNos[]") List<Integer> tempNos) {
        try {
            log.debug("삭제 요청된 tempNos: {}", tempNos); // 디버깅용
            
            if (tempNos == null || tempNos.isEmpty()) {
                return ResponseEntity.badRequest().body("삭제할 문서 번호가 없습니다.");
            }
            
            service.deleteTempApprovals(tempNos);
            
            return ResponseEntity.ok("임시저장 문서가 삭제되었습니다.");
        } catch (Exception e) {
            log.error("임시저장 문서 삭제 중 오류 발생: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("삭제 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/{tempNo}")
    public ApprovalTemp getTempApprovalById(@PathVariable int tempNo) {
        return service.getTempApprovalById(tempNo);
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateTempApproval(@RequestBody ApprovalTemp approvalTemp) {
        int result = service.updateTempApproval(approvalTemp);
        if (result > 0) {
            return ResponseEntity.ok("임시 저장 문서 수정 완료");
        } else {
            return ResponseEntity.badRequest().body("수정 실패: 존재하지 않는 문서이거나 변경사항이 없습니다.");
        }
    }

}
