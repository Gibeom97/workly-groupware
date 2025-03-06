package com.workly.final_project.chat.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatStatusUpdateDTO {

	private int userNo;
	private int statusType; // 1:비활성, 2: 활성화
	private String chatStatus;
}
