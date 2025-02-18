package com.workly.final_project.chat.model.vo;

import java.sql.Time;
import java.sql.Timestamp;

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
	private Timestamp receviedDate;
}
