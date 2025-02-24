package com.workly.final_project.chat.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	private int chatRoomNo;
	private Date createdChat; // localDate로 자료형 변경?
	private String roomTitle;
	private String chatType;
}
