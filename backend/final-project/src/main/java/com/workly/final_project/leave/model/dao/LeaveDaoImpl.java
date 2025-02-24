package com.workly.final_project.leave.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.leave.model.dto.AnnualHistoryDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LeaveDaoImpl implements LeaveDao {

	private final SqlSession session;
	
	@Override
	public List<AnnualHistoryDTO> selectLeaveHistory(PageInfo pi, AnnualHistoryDTO history) {
		
		PageRow pr = Util.pagerow(pi);
		
		history.setPr(pr);
		
		System.out.println("history: " + history);
		return session.selectList("leave.selectLeaveHistory", history);
	}

	@Override
	public int selectLeaveCount(AnnualHistoryDTO history) {
		
		return session.selectOne("leave.selectLeaveCount",history);
	}
}
