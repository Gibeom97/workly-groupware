package com.workly.final_project.ai.model.service;

import java.util.List;
import java.util.Map;

import com.workly.final_project.ai.model.vo.Company;
import com.workly.final_project.ai.model.vo.CompanyPolicy;

public interface CompanyPolicyService {

	List<CompanyPolicy> getPoliciesByCompanyId(Long companyId);

	void saveOrUpdatePolicy(CompanyPolicy policy);

	void deletePolicy(int companyId, String question);

	Company saveCompany(Company company);

}