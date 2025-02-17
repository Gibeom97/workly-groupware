package com.workly.final_project.common.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attachment {
	private String originalName;
	private String changeName;
	private String filePath;
	private Date uploadDate;
	private int refUserNo; // 프로필 이미지 참조사번
	private String attachStatus;
}
