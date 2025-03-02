package com.workly.final_project.approval.model.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workly.final_project.approval.model.dao.ApprovalLineDao;
import com.workly.final_project.approval.model.vo.ApprovalActualLine;
import com.workly.final_project.approval.model.vo.ApprovalFavoriteLine;
import com.workly.final_project.approval.model.vo.ApprovalLine;

@Service
public class ApprovalLineServiceImpl implements ApprovalLineService{
	
	@Autowired
	private ApprovalLineDao dao;

	@Override
	public void saveApprovalLine(List<ApprovalLine> approvalLines) {
		dao.saveApprovalLine(approvalLines);
		
		List<Integer> approvalNosToUpdate = approvalLines.stream()
			    .filter(line -> line.getApprovalLevel() == 1 && "수신".equals(line.getApprovalLineType()))
			    .map(ApprovalLine::getApprovalNo)
			    .distinct()
			    .collect(Collectors.toList());
		
		if (!approvalNosToUpdate.isEmpty()) {
		    dao.updateApprovalTypeToApproved(approvalNosToUpdate);
		}
		
	}

	@Override
	public int saveFavoriteInfo(ApprovalFavoriteLine favoriteLineInfo) {
		dao.saveFavoriteInfo(favoriteLineInfo);
		return favoriteLineInfo.getLineNo(); // 자동 생성된 LINE_NO 반환
	}

	@Override
	public void saveFavoriteLine(List<ApprovalActualLine> approvalLines) {
		if(!approvalLines.isEmpty()) {
			dao.saveFavoriteLine(approvalLines);
		}
	}

	@Override
	public List<Map<String, Object>> getFavoriteLinesByUserNo(int userNo) {
		return dao.getFavoriteLinesByUserNo(userNo);
	}

	@Override
	public void deleteFavoriteLine(int userNo, String favoriteName) {
		dao.deleteFavoriteLine(userNo, favoriteName);
		
	}

	@Override
	public boolean approveDocument(ApprovalLine approvalLine) {
		int approvalNo = approvalLine.getApprovalNo();
		int userNo = approvalLine.getUserNo();
		
		// 1. 현재 사용자의 결재순서(APPROVAL_LEVEL) 조회
		int currentLevel = dao.findApprovalLevel(approvalNo, userNo);
		
		if(currentLevel == -1) {
			return false; // 해당 사용자가 결재가가 아닐 경우
		}
		
		// 2. 현재 사용자의 STATUS를 2(승인)으로 변경
		dao.updateApprovalStatus(approvalNo, userNo, 2);
		
		// 3. 다음 결재자 찾기(APPROVAL_LEVEL + 1)
		Map<String, Object> nextApprover = dao.findNextApprover(approvalNo, currentLevel + 1);
		
		if(nextApprover != null) {
			String nextType = (String) nextApprover.get("APPROVAL_LINE_TYPE");
			
		    BigDecimal userNoDecimal = (BigDecimal) nextApprover.get("USER_NO");
		    Integer nextUserNo = userNoDecimal.intValue(); // 또는 intValueExact() 사용

			
			if("수신".equals(nextType)) {
				// 다음 결재자가 '수신'이면 결재문서를 즉시 승인 완료
				dao.updateFinalApproval(approvalNo);
			} else {
				// 다음 결재자의 상태를 "진행중"(STATUS = 1)로 변경
				dao.updateApprovalStatus(approvalNo, nextUserNo, 1);				
			}
					
		}
		return true;
		
	}

	@Override
	public boolean isFinalApprover(int approvalNo) {
		return dao.isFinalApprover(approvalNo) == 0;
	}

	@Override
	public void updateFinalApproval(int approvalNo) {
		dao.updateFinalApproval(approvalNo);
	}

}


























