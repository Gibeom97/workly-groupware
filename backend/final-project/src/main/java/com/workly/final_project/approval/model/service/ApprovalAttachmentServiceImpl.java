package com.workly.final_project.approval.model.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.approval.model.dao.ApprovalAttachmentDao;
import com.workly.final_project.approval.model.vo.ApprovalAttachment;

@Service
public class ApprovalAttachmentServiceImpl implements ApprovalAttachmentService{
	
	@Autowired
	private ApprovalAttachmentDao dao;

	@Override
	@Transactional
	public void saveAttachment(int approvalNo, MultipartFile file) {
		try {
			ApprovalAttachment attachment = new ApprovalAttachment();
	        attachment.setApprovalNo(approvalNo);
	        attachment.setOriginName(file.getOriginalFilename());
	        attachment.setFileData(file.getBytes()); // 🔥 파일 데이터를 DB BLOB 컬럼에 저장
			
			dao.saveAttachment(attachment);
		} catch (IOException e) {
			System.err.println("❌ 파일 변환 실패: " + e.getMessage());
	        throw new RuntimeException("파일 저장 중 오류 발생", e);
		}
		
	}

}
