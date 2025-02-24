package com.workly.final_project.chat.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workly.final_project.chat.model.dao.ChatDao;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

@Service
public class ChatServiceImpl implements ChatService{

	private final ChatDao chatDao;
	
	@Autowired
	public ChatServiceImpl(ChatDao chatDao) {
		this.chatDao = chatDao;
	}
	
	@Override
	public List<MemberDeptPositionDTO> getChatMembers() {
		return chatDao.getChatMembers();
	}

}
