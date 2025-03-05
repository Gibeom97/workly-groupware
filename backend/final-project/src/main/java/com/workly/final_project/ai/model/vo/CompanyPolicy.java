package com.workly.final_project.ai.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyPolicy {
	
	private int id;
	private int companyId;
	private String category;
	private String question;
	private String answer;

}
