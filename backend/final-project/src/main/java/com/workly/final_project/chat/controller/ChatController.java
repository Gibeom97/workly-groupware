package com.workly.final_project.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.chat.model.service.ChatService;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/chat")
public class ChatController {
		
		private final ChatService chatService;
		
		@Autowired
		public ChatController(ChatService chatService) {
			this.chatService = chatService;
		}
		
		@GetMapping("/members")
		 public ResponseEntity<List<MemberDeptPositionDTO>> getChatMembers() {
	        List<MemberDeptPositionDTO> members = chatService.getChatMembers();
	        return ResponseEntity.ok(members);
	    }
		
			
		
		
		
		
























	}




