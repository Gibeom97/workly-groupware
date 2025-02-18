package com.workly.final_project.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	private int chatRoomNo;
	private String createChat;
	private String roomName;
}
