package com.workly.final_project.approval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.approval.model.service.ApprovalAttachmentService;

@RestController
@RequestMapping("/api/approval/attachments")
@CrossOrigin(origins = "http://localhost:5173")
public class ApprovalAttachmentController {

    @Autowired
    private ApprovalAttachmentService service;

    // 첨부파일 업로드 API
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> uploadFiles(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("approvalNo") int approvalNo) {
        try {
            if (files == null || files.isEmpty()) {
                return ResponseEntity.ok("파일 없음: 파일 업로드 로직 실행 안 함.");
            }

            // 🔥 여러 개의 파일을 저장하기 위해 forEach 사용
            for (MultipartFile file : files) {
                service.saveAttachment(approvalNo, file);
            }

            return ResponseEntity.ok("파일 업로드 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
        }
    }
}
