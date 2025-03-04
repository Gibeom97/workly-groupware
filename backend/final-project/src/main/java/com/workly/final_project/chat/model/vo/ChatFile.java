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
	
	
}
