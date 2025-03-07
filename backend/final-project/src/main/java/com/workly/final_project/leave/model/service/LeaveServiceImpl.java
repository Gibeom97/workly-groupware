package com.workly.final_project.leave.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.leave.model.dao.LeaveDao;
import com.workly.final_project.leave.model.dto.AnnualHistoryDTO;
import com.workly.final_project.leave.model.vo.AnnualLeave;
import com.workly.final_project.leave.model.vo.LeavePolicy;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService{

	private final LeaveDao dao;

	@Override
	public List<AnnualHistoryDTO> selectLeaveHistory(PageInfo pi, AnnualHistoryDTO history) {
		return dao.selectLeaveHistory(pi, history);
	}

	@Override
	public int selectLeaveCount(AnnualHistoryDTO history) {
		return dao.selectLeaveCount(history);
	}

	@Override
	public List<AnnualHistoryDTO> selectLeaveDetail(AnnualHistoryDTO history) {
		return dao.selectLeaveDetail(history);
	}

	@Override
	public int updateLeave(AnnualLeave leave) {
		return dao.updateLeave(leave);
	}

	@Override
	public List<LeavePolicy> selectLeavePolicy() {
		return dao.selectLeavePolicy();
	}

	@Override
	public int updatePolicy(LeavePolicy policy) {
		return dao.updatePolicy(policy);
	}

	@Override
	public void insertAnnualLeave() {
		dao.insertAnnualLeave();
	}
}
