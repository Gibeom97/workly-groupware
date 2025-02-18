package com.workly.final_project.chat.model.vo;

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
	
}
