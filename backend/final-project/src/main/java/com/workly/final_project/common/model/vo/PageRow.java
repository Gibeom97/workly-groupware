package com.workly.final_project.common.model.vo;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class PageRow {
	private int startRow;
	private int endRow;
}
