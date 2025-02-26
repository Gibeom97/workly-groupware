package com.workly.final_project.approval.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalTempDao;
import com.workly.final_project.approval.model.vo.ApprovalTemp;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
@Service
public class ApprovalTempServiceImpl implements ApprovalTempService{

	private final ApprovalTempDao dao;
	private static final Logger log = LoggerFactory.getLogger(ApprovalTempServiceImpl.class);

	@Override
    public int saveTempApproval(ApprovalTemp approvalTemp) {
       return dao.saveTempApproval(approvalTemp);
    }

    @Override
    public List<ApprovalTemp> getTempApprovalsByUser(int userNo) {
        return dao.getTempApprovalsByUser(userNo);
    }

    @Override
    @Transactional
    public void deleteTempApprovals(List<Integer> tempNos) {
        int result = dao.deleteTempApprovals(tempNos);
        if (result <= 0) {
            throw new RuntimeException("임시저장 문서 삭제 실패");
        }
    }

    @Override
    public ApprovalTemp getTempApprovalById(int tempNo) {
        return dao.getTempApprovalById(tempNo);
    }

    @Override
    public int updateTempApproval(ApprovalTemp approvalTemp) {
        return dao.updateTempApproval(approvalTemp);
    }
	
	
}
