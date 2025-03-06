package com.workly.final_project.approval.model.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.workly.final_project.approval.model.dao.ApprovalTempDao;
import com.workly.final_project.approval.model.vo.ApprovalTemp;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ApprovalTempServiceImpl implements ApprovalTempService {

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
    public void deleteApprovalTemp(List<Integer> tempNos) {
        dao.deleteApprovalTemp(tempNos);
    }

    @Override
    public ApprovalTemp getTempApprovalDetail(int tempNo) {
        return dao.getTempApprovalById(tempNo);
    }

    @Override
    public int updateTempApproval(ApprovalTemp approvalTemp) {
        return dao.updateTempApproval(approvalTemp);
    }
}
