package com.workly.final_project.approval.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.workly.final_project.approval.model.service.ApprovalTempService;
import com.workly.final_project.approval.model.vo.ApprovalTemp;

@RestController
@RequestMapping("/api/approvalTemp")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalTempController {

    private static final Logger log = LoggerFactory.getLogger(ApprovalTempController.class);

    @Autowired
    private ApprovalTempService service;

    // ✅ 임시 저장 (POST)
    @PostMapping("/save")
    public ResponseEntity<String> saveTempApproval(@RequestBody ApprovalTemp approvalTemp) {
        service.saveTempApproval(approvalTemp);
        return ResponseEntity.ok("임시 저장 완료");
    }

    // ✅ 사용자별 임시 저장 문서 조회 (GET)
    @GetMapping("/list/{userNo}")
    public ResponseEntity<?> getTempApprovalsByUser(@PathVariable int userNo) {
        try {
            List<ApprovalTemp> tempApprovals = service.getTempApprovalsByUser(userNo);
            if (tempApprovals == null || tempApprovals.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("임시 저장 문서가 없습니다.");
            }
            return ResponseEntity.ok(tempApprovals);
        } catch (Exception e) {
            log.error("❌ 임시 저장 문서 조회 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("임시 저장 문서 조회 중 오류가 발생했습니다.");
        }
    }


    // ✅ 특정 임시 저장 문서 상세 조회 (GET) → 기존 `/{tempNo}` 경로 복구
    @GetMapping("/{tempNo}")
    public ResponseEntity<?> getApproval(@PathVariable int tempNo) {
        ApprovalTemp approval = service.getTempApprovalDetail(tempNo);
        if (approval == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No data found");
        }
        System.out.println("Approval Data: " + approval); // 로그 확인
        return ResponseEntity.ok(approval);
    }


    // ✅ 여러 개의 TEMP_NO를 받아 삭제 처리 (DELETE)
    @DeleteMapping("/deleteApprovalTemp")
    public ResponseEntity<String> deleteApprovalTemp(@RequestBody Map<String, List<Integer>> request) {
        try {
            List<Integer> tempNos = request.get("tempNos");
            if (tempNos == null || tempNos.isEmpty()) {
                return ResponseEntity.badRequest().body("삭제할 문서를 선택해주세요.");
            }
            service.deleteApprovalTemp(tempNos);
            return ResponseEntity.ok("결재 문서 삭제 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문서 삭제 중 오류 발생");
        }
    }

    // ✅ 임시 저장 문서 업데이트 (PUT)
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
