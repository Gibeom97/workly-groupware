package com.workly.final_project.approval.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.approval.model.vo.ApprovalTemp;

@Repository
public class ApprovalTempDaoImpl implements ApprovalTempDao {

    private final SqlSession sqlSession;

    @Autowired
    public ApprovalTempDaoImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    // 임시 저장 데이터 삽입
    @Override
    public int saveTempApproval(ApprovalTemp approvalTemp) {
        int result = sqlSession.insert("ApprovalTemp.saveTempApproval", approvalTemp);
        System.out.println("✅ 임시 저장 완료, TempNo: " + approvalTemp.getTempNo());
        return result;
    }

    // 특정 유저의 임시 저장 목록 조회
    @Override
    public List<ApprovalTemp> getTempApprovalsByUser(int userNo) {
        return sqlSession.selectList("ApprovalTemp.getTempApprovalsByUser", userNo);
    }

    // 선택한 임시저장 문서 삭제
    @Override
    public int deleteTempApprovals(List<Integer> tempNos) {
        return sqlSession.delete("ApprovalTemp.deleteTempApprovals", tempNos);
    }

    // TEMP_NO로 임시저장 문서 조회
    @Override
    public ApprovalTemp getTempApprovalById(int tempNo) {
        return sqlSession.selectOne("ApprovalTemp.getTempApprovalById", tempNo);
    }

    // 임시 저장 문서 업데이트
    @Override
    public int updateTempApproval(ApprovalTemp approvalTemp) {
        return sqlSession.update("ApprovalTemp.updateTempApproval", approvalTemp);
    }
}
