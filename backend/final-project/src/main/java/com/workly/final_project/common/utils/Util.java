package com.workly.final_project.common.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.common.model.vo.PageInfo;

public class Util {
	
    // 파일명 변경 메서드
    public static Map<String, String> fileRename(MultipartFile file, String serverPath) throws IOException {
    	// 디렉토리 생성
    	File directory = new File(serverPath);
    	if (!directory.exists()) {
    		directory.mkdirs();
    	}
    	
    	// 원본 파일명
        String originalName = file.getOriginalFilename();
        
        // 파일 확장자
        String fileExtension = originalName.substring(originalName.lastIndexOf("."));

        // UUID 생성
        String uuid = UUID.randomUUID().toString();
        String shortUUID = uuid.replace("-", "").substring(0,8);
        
        // 변경 파일명 (날짜 + UUID)
        String changeName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + shortUUID + fileExtension;
        
        // 저장된 파일의 전체 경로
        String filePath = Paths.get(serverPath, changeName).toString();
        
        // 파일 저장
        File destinationFile = new File(filePath);
        file.transferTo(destinationFile);
        
        // Map으로 반환
        Map<String, String> fileInfo = new HashMap<>();
        fileInfo.put("originalName", originalName);
        fileInfo.put("changeName", changeName);
        
        return fileInfo;
    }
    
	public static PageInfo pagination(int cPage, int count) {
		int currentPage = cPage; // 1. 클라이언트 요청 페이지
		int listCount = count; // 2. 컨텐츠 총 갯수
		int pageLimit = 5; // 3. 페이징바 5페이지
		int contentsLimit = 10; // 4. 한 페이지당 컨텐츠 수 10개
		
		int maxPage = (int)Math.ceil((double)listCount / contentsLimit); // 5. 마지막 페이지 수 
		int startPage = ((currentPage - 1) / pageLimit) * pageLimit + 1; // 6. 처음 페이지 수
		int endPage = startPage + pageLimit - 1; // 7.  페이지 끝 수
		
		if(endPage > maxPage) { 
			endPage = maxPage;
		}
		
		PageInfo pi = new PageInfo(listCount, currentPage, pageLimit, contentsLimit, startPage, endPage, maxPage);
		
		return pi;
	}
}