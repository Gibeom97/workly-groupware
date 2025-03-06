package com.workly.final_project.chat.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatParticipant {

	private int chatRoomNo;
	private int userNo;
	//private String roomTitle;
	private Date enterDate; // localDate로 자료형 변경?
	private String bellSetting;
	
}
