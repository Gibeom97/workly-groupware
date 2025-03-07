package com.workly.final_project.leave.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.common.utils.Util;
import com.workly.final_project.leave.model.dto.AnnualHistoryDTO;
import com.workly.final_project.leave.model.vo.AnnualLeave;
import com.workly.final_project.leave.model.vo.LeavePolicy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class LeaveDaoImpl implements LeaveDao {

	private final SqlSession session;
	
	@Override
	public List<AnnualHistoryDTO> selectLeaveHistory(PageInfo pi, AnnualHistoryDTO history) {
		PageRow pr = Util.pagerow(pi);
		
		history.setPr(pr);
		
		return session.selectList("leave.selectLeaveHistory", history);
	}

	@Override
	public int selectLeaveCount(AnnualHistoryDTO history) {
		
		return session.selectOne("leave.selectLeaveCount",history);
	}

	@Override
	public List<AnnualHistoryDTO> selectLeaveDetail(AnnualHistoryDTO history) {
		return session.selectList("leave.selectLeaveDetail", history);
	}

	@Override
	public int updateLeave(AnnualLeave leave) {
		return session.update("leave.updateLeave", leave);
	}

	@Override
	public List<LeavePolicy> selectLeavePolicy() {
		return session.selectList("leave.selectLeavePolicy");
	}

	@Override
	public int updatePolicy(LeavePolicy policy) {
		return session.update("leave.updatePolicy", policy);
	}

	@Override
	@Scheduled(cron = "0 0 0 1 1 *")
	public void insertAnnualLeave() {
		try {
			session.insert("leave.insertAnnualLeave");
            log.info("AnnualLeave 데이터 삽입 성공");
        } catch (Exception e) {
            log.error("AnnualLeave 데이터 삽입 실패: " + e.getMessage());
        }
	}
}
