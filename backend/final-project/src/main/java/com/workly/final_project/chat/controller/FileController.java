package com.workly.final_project.chat.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class FileController {

    private static final String UPLOAD_DIR = "C:/FinalProject/backend/final-project/src/main/resources/static/uploads/chatFile/";

    @GetMapping("/chatFile/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        System.out.println("📌 요청된 파일 경로: " + filePath.toString());

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            System.out.println("❌ 파일을 찾을 수 없습니다: " + filename);
            return ResponseEntity.notFound().build();
        }

        // 파일 MIME 타입 자동 감지
        String contentType = Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = "application/octet-stream"; // 기본값
        }

        System.out.println("✅ MIME 타입: " + contentType);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
