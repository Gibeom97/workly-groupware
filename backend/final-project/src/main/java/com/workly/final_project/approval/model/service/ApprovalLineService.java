package com.workly.final_project.approval.model.service;

import java.util.List;
import java.util.Map;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.ApprovalActualLine;
import com.workly.final_project.approval.model.vo.ApprovalFavoriteLine;
import com.workly.final_project.approval.model.vo.ApprovalLine;

public interface ApprovalLineService {

	void saveApprovalLine(List<ApprovalLine> approvalLines);

	int saveFavoriteInfo(ApprovalFavoriteLine favoriteLineInfo);

	void saveFavoriteLine(List<ApprovalActualLine> approvalLines);

	List<Map<String, Object>> getFavoriteLinesByUserNo(int userNo);

	void deleteFavoriteLine(int userNo, String favoriteName);

	boolean approveDocument(ApprovalLine approvalLine);

	boolean isFinalApprover(int approvalNo);

	void updateFinalApproval(int approvalNo);

	String selectApprovalType(int approvalNo);

	void updateAnnualLeave(int userNo, int approvalNo);

	int selectApprovalUserNo(int approvalNo);


	
//	List<ApprovalLine> getInProgressApprovals(int userNo);
}
