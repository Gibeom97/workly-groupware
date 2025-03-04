package com.workly.final_project.ai.model.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.workly.final_project.ai.model.vo.Company;
import com.workly.final_project.ai.model.vo.CompanyPolicy;

public interface CompanyPolicyDao {

	List<CompanyPolicy> getPoliciesByCompanyId(Long companyId);

	Optional<CompanyPolicy> findByCompanyIdAndQuestion(int companyId, String question);

	void updatePolicy(CompanyPolicy policy);

	void insertPolicy(CompanyPolicy policy);

	void deletePolicy(int companyId, String question);

	Company saveCompany(Company company);



}
