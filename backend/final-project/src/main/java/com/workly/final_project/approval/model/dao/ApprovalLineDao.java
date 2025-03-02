package com.workly.final_project.approval.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.approval.model.dto.ApprovalDTO;
import com.workly.final_project.approval.model.vo.ApprovalActualLine;
import com.workly.final_project.approval.model.vo.ApprovalFavoriteLine;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@Mapper
public interface ApprovalLineDao {

	void saveApprovalLine(List<ApprovalLine> approvalLines);
	
//	List<ApprovalLine> findInProgressApprovalsByUserNo(int userNo);

	int saveFavoriteInfo(ApprovalFavoriteLine favoriteLineInfo);

	void saveFavoriteLine(List<ApprovalActualLine> approvalLines);

	List<Map<String, Object>> getFavoriteLinesByUserNo(int userNo);

	void deleteFavoriteLine(int userNo, String favoriteName);


	void updateApprovalStatus(int approvalNo, int userNo, int status);

	Map<String, Object> findNextApprover(int approvalNo, int nextLevel);

	int findApprovalLevel(int approvalNo, int userNo);

	int isFinalApprover(int approvalNo);

	void updateFinalApproval(int approvalNo);

	void updateApprovalTypeToApproved(List<Integer> approvalNosToUpdate);

}
