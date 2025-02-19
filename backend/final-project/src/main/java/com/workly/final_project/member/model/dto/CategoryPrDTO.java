package com.workly.final_project.member.model.dto;

import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.member.model.vo.CategoryFilter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryPrDTO {
	private CategoryFilter filter;
	private PageRow pr;
}
