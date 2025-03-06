package com.workly.final_project.chat.model.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.chat.model.dao.UserDao;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {


	private static final String UPLOAD_DIR = "C:/FinalProject/backend/final-project/src/main/resources/static/uploads/chatFile/";

    private final UserDao userDao;

	 // 🔹 프로필 이미지 조회
	    public String getProfileImg(int userNo) {
	        String profileImg = userDao.getProfileImg(userNo);
	        return (profileImg != null) ? profileImg : "/uploads/profile/default.png"; // 기본 이미지 설정
	    }
//    // 프로필 이미지 업데이트 (INSERT 또는 UPDATE 분기 처리)
//    public void updateProfileImg(int userNo, String profileImgPath) {
//        System.out.println("📌 updateProfileImg 실행됨 - userNo: " + userNo);
//        System.out.println("📌 프로필 이미지 경로: " + profileImgPath);
//
//        ChatProfile existingProfile = userDao.getProfileByUserNo(userNo);
//
//        if (existingProfile == null) {
//            // 기존 프로필이 없으면 INSERT 수행
//            ChatProfile chatProfile = new ChatProfile();
//            chatProfile.setUserNo(userNo);
//            chatProfile.setProfileImg(profileImgPath);
//
//            int result = userDao.insertProfile(chatProfile);
//            System.out.println(result > 0 ? "✅ 프로필 INSERT 성공!" : "❌ 프로필 INSERT 실패!");
//
//        } else {
//            // 기존 프로필이 있으면 UPDATE 수행
//            int result = userDao.updateChatProfile(userNo, profileImgPath);
//            System.out.println(result > 0 ? "✅ 프로필 UPDATE 성공!" : "❌ 프로필 UPDATE 실패!");
//        }
//    }
    // 🔹 프로필 이미지 업데이트
    public void updateChatProfile(int userNo, String profilePath) {
        if (userDao.getProfileImg(userNo) == null) {
            userDao.insertProfile(userNo, profilePath);
        } else {
            userDao.updateChatProfile(userNo, profilePath);
        }
    }
    
    public String saveProfileImage(int userNo, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = ".png"; // 기본 확장자

        // 원래 파일명에서 확장자 추출
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        }

        // jpg, jpeg, png만 허용
        if (!extension.equals(".png") && !extension.equals(".jpg") && !extension.equals(".jpeg")) {
            // 허용하지 않는 파일 확장자 처리 (예: 예외 발생 또는 null 반환)
            return null;
        }

        String fileName = "profile_" + userNo + "_" + System.currentTimeMillis() + extension;
        String filePath = UPLOAD_DIR + fileName;

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());
            updateChatProfile(userNo, "/uploads/chatFile/" + fileName);
            return "/uploads/chatFile/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
   
    public List<MemberDeptPositionDTO> getChatMembersWithoutMe(int chatRoomNo, int userNo) {
        return userDao.getChatMembersWithoutMe(chatRoomNo, userNo);
    }

}
