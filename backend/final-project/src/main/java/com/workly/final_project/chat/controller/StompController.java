package com.workly.final_project.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.chat.model.service.ChatService;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.UserChat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@RestController
public class StompController {
	
	private final ChatService chatService;
	private final SimpMessagingTemplate messagingTemplate;
	
	
	
	// 채팅 메세지 저장 및 전송
	@MessageMapping("/api/chat/sendMessage/{roomNo}")
	@SendTo("/sub/chatRoom/{roomNo}")
	@Transactional
	public Chat sendMessage(@DestinationVariable int chatRoomNo, @RequestBody Chat chat) {
	    log.info("📩 [백엔드] 받은 메시지 데이터: {}", chat);
	    System.out.println("📩 [서버] 메시지 브로드캐스트: " +chat.getMessage()); 
	    if (chat.getUserNo() == 0) {
	        log.warn("⚠️ userNo가 없어서 ChatParticipant에서 가져오는 중...");
	        List<Integer> userNos = chatService.getUserNosByChatRoom(chatRoomNo);
	        log.info("✅ [백엔드] ChatParticipant에서 가져온 userNos: {}", userNos);

	        if (!userNos.isEmpty()) {
	            chat.setUserNo(userNos.get(0));
	            log.info("✅ [백엔드] userNo 보정 완료: {}", chat.getUserNo());
	        } else {
	            log.error("❌ [백엔드] userNo 찾을 수 없음. 메시지 전송 불가!");
	            return null;
	        }
	    }

	    chatService.saveChatMessage(chat);
	    messagingTemplate.convertAndSend("/sub/chatRoom/" + chatRoomNo, chat);

	    return chat;
	}


	 //채팅 메세지 목록 조회
	@GetMapping("/api/chat/messages/{chatRoomNo}")
	public ResponseEntity<?> getChatMessages(@PathVariable int chatRoomNo) {
	    List<Chat> messages = chatService.getChatMessages(chatRoomNo);

	    if (messages == null || messages.isEmpty()) {
	        return ResponseEntity.ok(List.of()); // 빈 배열 반환 (204 No Content 방지)
	    }

	    return ResponseEntity.ok(messages);
	}

	
	@PostMapping("/api/chat/enter")
	public ResponseEntity<String> enterChatRoom(@RequestBody UserChat userChat) {
	    try {
	        chatService.insertOrUpdateUserChat(userChat); // `MERGE` 활용으로 insert/update 자동 처리
	        return ResponseEntity.ok("채팅방 입장 성공");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅방 입장 실패");
	    }
	}


	// 마지막으로 읽은 번호 가지고 오기
	@GetMapping("/api/chat/lastRead/{chatRoomNo}/{userNo}")
	public ResponseEntity<Integer> getLastReadChatNo(
	        @PathVariable int chatRoomNo,
	        @PathVariable int userNo) {
	    try {
	        int lastReadChatNo = chatService.getLastReadChatNo(userNo, chatRoomNo);
	        return ResponseEntity.ok(lastReadChatNo);
	    } catch (Exception e) {
	        log.error("❌ lastReadChatNo 조회 실패", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1);
	    }
	}
	
	@PostMapping("/api/chat/saveMessage")
	public ResponseEntity<?> saveChatMessage(@RequestBody Chat chat) {
	    try {
	        chatService.saveChatMessage(chat);
	        return ResponseEntity.ok(chat);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메시지 저장 실패");
	    }
	}
	

	
	





	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
