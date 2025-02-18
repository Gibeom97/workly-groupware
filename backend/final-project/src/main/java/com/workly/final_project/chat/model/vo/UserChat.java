package com.workly.final_project.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChat {
	
	private int userNo;
	private int chatRoomNo;
	private int lastReadChatNo; // 마지막으로 읽은 채팅 번호
	
}
