package com.workly.final_project.chat.model.vo;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
	
	private int chatNo;
	private int chatRoomNo;
	private String message;
	//private LocalDateTime receivedDate;
	private String receivedDate;
	private int userNo;
	private String userName;
	private String fileUrl; // 파일 url 저장 필드 추가
}