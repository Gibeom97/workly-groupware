package com.workly.final_project.chat.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDTO {

	private int userNo;
	private int favoriteNo; // 즐겨찾기 할 대상 no
}
