package com.workly.final_project.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatParticipant {

	private int chatRoomNo;
	private int userNo;
	private String roomName;
	private LocalDate enterDate;
	private String bellSetting;
	
}
