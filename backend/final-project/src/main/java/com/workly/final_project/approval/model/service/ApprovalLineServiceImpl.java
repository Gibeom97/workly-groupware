package com.workly.final_project.approval.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.approval.model.dao.ApprovalLineDao;
import com.workly.final_project.approval.model.dto.ApprovalDTO;
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
}
