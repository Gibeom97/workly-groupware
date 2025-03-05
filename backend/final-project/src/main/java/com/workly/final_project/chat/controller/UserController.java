package com.workly.final_project.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.chat.model.service.UserService;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

@RestController
@RequestMapping("/api/user")
public class UserController {

	 @Autowired
	    private UserService userService;

	    // 🔹 프로필 이미지 가져오기
//	    @GetMapping("/profile/{userNo}")
//	    public ResponseEntity<Map<String, String>> getProfileImg(@PathVariable int userNo) {
//	        String profileImg = userService.getProfileImg(userNo);
//	        Map<String, String> response = new HashMap<>();
//	        response.put("profileImg", profileImg);
//	        return ResponseEntity.ok(response);
//	    }
	 @GetMapping("/profile/{userNo}")
	 public ResponseEntity<Map<String, String>> getProfileImg(@PathVariable int userNo) {
	     String profileImg = userService.getProfileImg(userNo);
	     Map<String, String> response = new HashMap<>();

	     if (profileImg == null || profileImg.isEmpty()) {
	         profileImg = "/uploads/profile/default.png"; // 기본 프로필 이미지
	     }

	     // ✅ 여기서 workly 경로를 포함하도록 수정
	     if (!profileImg.startsWith("http")) {
	         profileImg = "http://localhost:8003/workly" + profileImg;
	     }

	     response.put("profileImg", profileImg);
	     return ResponseEntity.ok(response);
	 }




	    // 🔹 프로필 이미지 업로드 및 업데이트
//	    @PostMapping("/uploadProfile")
//	    public ResponseEntity<String> uploadProfile(@RequestParam("file") MultipartFile file, @RequestParam("userNo") int userNo) {
//	        try {
//	            String uploadDir = "C:/upload/profile/"; // 저장 경로
//	            File uploadPath = new File(uploadDir);
//	            if (!uploadPath.exists()) {
//	                uploadPath.mkdirs(); // 폴더 없으면 생성
//	            }
//
//	            // 파일명 설정 (사용자 ID + 확장자 유지)
//	            String fileName = userNo + "_" + file.getOriginalFilename();
//	            File saveFile = new File(uploadDir, fileName);
//	            file.transferTo(saveFile);
//
//	            // DB에 프로필 이미지 경로 업데이트
//	            String profilePath = "/upload/profile/" + fileName;
//	            userService.updateChatProfile(userNo, profilePath);
//
//	            return ResponseEntity.ok(profilePath);
//	        } catch (Exception e) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
//	        }
//	    }
	    
	    @PostMapping("/uploadProfile")
	    public Map<String, String> uploadProfile(@RequestParam("file") MultipartFile file, 
	                                             @RequestParam("userNo") int userNo) {
	        Map<String, String> response = new HashMap<>();
	        
	        String filePath = userService.saveProfileImage(userNo, file);
	        if (filePath != null) {
	            response.put("profileImg", filePath);
	        } else {
	            response.put("error", "파일 업로드 실패");
	        }
	        return response;
	    }
	    
	    // 나를 제외한 사원들 프로필
	    @GetMapping("/chat/membersWithoutMe/{chatRoomNo}/{userNo}")
	    public ResponseEntity<List<MemberDeptPositionDTO>> getChatMembersWithoutMe(
	            @PathVariable int chatRoomNo,
	            @PathVariable int userNo) {
	        List<MemberDeptPositionDTO> members = userService.getChatMembersWithoutMe(chatRoomNo, userNo);
	        return ResponseEntity.ok(members);
	    }

}
