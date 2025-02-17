package com.workly.final_project.approval.model.service;

import org.springframework.web.multipart.MultipartFile;

public interface ApprovalAttachmentService {

	void saveAttachment(int approvalNo, MultipartFile file) throws Exception;

}
