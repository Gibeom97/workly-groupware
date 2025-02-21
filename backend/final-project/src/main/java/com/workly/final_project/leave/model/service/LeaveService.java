package com.workly.final_project.leave.model.service;

import java.util.List;

import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.leave.model.dto.AnnualHistoryDTO;

public interface LeaveService {
	List<AnnualHistoryDTO> selectLeaveHistory(PageInfo pi, AnnualHistoryDTO history);

	int selectLeaveCount(AnnualHistoryDTO history);
}
