package com.workly.final_project.ai.model.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.ai.model.dao.CompanyPolicyDao;
import com.workly.final_project.ai.model.vo.Company;
import com.workly.final_project.ai.model.vo.CompanyPolicy;

@Service
public class CompanyPolicyServiceImpl implements CompanyPolicyService{
	
	@Autowired
	private CompanyPolicyDao dao;

	@Override
	public List<CompanyPolicy> getPoliciesByCompanyId(Long companyId) {
		return dao.getPoliciesByCompanyId(companyId);
	}

	@Override
	@Transactional
	public void saveOrUpdatePolicy(CompanyPolicy policy) {
		Optional<CompanyPolicy> existingPolicy = dao.findByCompanyIdAndQuestion(policy.getCompanyId(), policy.getQuestion());
        if (existingPolicy.isPresent()) {
            dao.updatePolicy(policy);
        } else {
            dao.insertPolicy(policy);
        }
    }

	@Override
	@Transactional
	public void deletePolicy(int companyId, String question) {
		dao.deletePolicy(companyId, question);
	}

	@Override
	@Transactional
	public Company saveCompany(Company company) {
		return dao.saveCompany(company);
	}
}
