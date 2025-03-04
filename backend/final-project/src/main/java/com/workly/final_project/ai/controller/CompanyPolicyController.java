package com.workly.final_project.ai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.ai.model.service.CompanyPolicyService;
import com.workly.final_project.ai.model.vo.CompanyPolicy;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyPolicyController {
	
	@Autowired
	private  CompanyPolicyService service;
	
	 // ✅ 특정 회사의 사내 규정 조회
    @GetMapping("/{companyId}")
    public List<CompanyPolicy> getPolicies(@PathVariable Long companyId) {
        return service.getPoliciesByCompanyId(companyId);
    }
    
    // ✅ 사내 규정 등록 및 수정 (기존 데이터가 있으면 업데이트)
    @PostMapping
    public String saveOrUpdatePolicy(@RequestBody CompanyPolicy policy) {
        service.saveOrUpdatePolicy(policy);
        return "사내 규정이 저장 또는 업데이트되었습니다.";
    }
    
    @DeleteMapping("/delete/{companyId}")
    public ResponseEntity<?> deletePolicy(@PathVariable int companyId, @RequestBody Map<String, String> requestData){
    	String question = requestData.get("question");
    	
    	service.deletePolicy(companyId, question);
    	
    	return ResponseEntity.ok().build();
    }

}
