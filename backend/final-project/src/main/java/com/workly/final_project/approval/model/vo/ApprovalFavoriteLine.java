package com.workly.final_project.approval.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalFavoriteLine {
	private int lineNo;// 시퀀스
	private int userNo; // 즐찾등록자
	private String favoriteName; // 즐겨찾기이름
}
