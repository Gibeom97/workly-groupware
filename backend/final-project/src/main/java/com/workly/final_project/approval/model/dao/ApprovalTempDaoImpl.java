package com.workly.final_project.approval.model.dao;

import com.workly.final_project.approval.model.vo.ApprovalTemp;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ApprovalTempDaoImpl implements ApprovalTempDao {

    private final SqlSessionTemplate sqlSession;

    @Override
    public int saveTempApproval(ApprovalTemp approvalTemp) {
        return sqlSession.insert("approvalTemp.saveTempApproval", approvalTemp);
    }

    @Override
    public List<ApprovalTemp> getTempApprovalsByUser(int userNo) {
        return sqlSession.selectList("approvalTemp.getTempApprovalsByUser", userNo);
    }

    @Override
    public ApprovalTemp getTempApprovalById(int tempNo) {
        return sqlSession.selectOne("approvalTemp.getTempApprovalById", tempNo);
    }

    @Override
    public int updateTempApproval(ApprovalTemp approvalTemp) {
        return sqlSession.update("approvalTemp.updateTempApproval", approvalTemp);
    }

    @Override
    public void deleteApprovalTemp(List<Integer> tempNos) {
        sqlSession.delete("approvalTemp.deleteApprovalTemp", tempNos);
    }
}
