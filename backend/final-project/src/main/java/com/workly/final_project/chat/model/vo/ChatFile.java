package com.workly.final_project.chat.model.vo;

import java.security.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatFile {
	
	private int chatFileNo;
	private int chatNo;
	private String chatOriginFile;
	private String chatChangeFile;
	private String chatFileType; // 파일 유형(image, video, file)
	private String chatFileUrl; // 클라이언트에서 접근할 파일 url
	private Timestamp uploadDate; // 파일 업로드 시간 추가
	
}
