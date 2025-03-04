package com.workly.final_project.ai.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.ai.model.vo.CompanyPolicy;

@Repository
public class CompanyPolicyDaoImpl implements CompanyPolicyDao{
	
	@Autowired
	private final SqlSession sqlSession;
	
	public CompanyPolicyDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public List<CompanyPolicy> getPoliciesByCompanyId(Long companyId) {
		return sqlSession.selectList("ai.getPoliciesByCompanyId", companyId);
	}

	@Override
	public Optional<CompanyPolicy> findByCompanyIdAndQuestion(int companyId, String question) {
		CompanyPolicy result = sqlSession.selectOne("ai.findByCompanyIdAndQuestion", 
	            Map.of("companyId", companyId, "question", question));
	        
	        return Optional.ofNullable(result);
	}

	@Override
	public void updatePolicy(CompanyPolicy policy) {
		sqlSession.insert("ai.updatePolicy", policy);
	}

	@Override
	public void insertPolicy(CompanyPolicy policy) {
		sqlSession.update("ai.insertPolicy", policy);
	}

	@Override
	public void deletePolicy(int companyId, String question) {

	    Map<String, Object> params = new HashMap<>();
	    params.put("companyId", companyId);
	    params.put("question", question);
		    
		sqlSession.delete("ai.deletePolicy", params);
	}
}
