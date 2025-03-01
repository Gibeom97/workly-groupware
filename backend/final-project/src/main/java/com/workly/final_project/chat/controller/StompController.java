package com.workly.final_project.chat.controller;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workly.final_project.chat.model.service.ChatService;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatFile;
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
	@MessageMapping("/chat/sendMessage/{chatRoomNo}")
	@SendTo("/sub/chatRoom/{chatRoomNo}")
	@Transactional
	public Chat sendMessage(@DestinationVariable int chatRoomNo, @RequestBody Chat chat) {
	    log.info("📩 [백엔드] 받은 메시지 데이터: {}", chat);

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


	
	// ✅ 채팅 메시지 조회 API
	@GetMapping("/api/chat/messages/{chatRoomNo}")
	public ResponseEntity<?> getChatMessages(@PathVariable int chatRoomNo) {
	    List<Chat> messages = chatService.getChatMessages(chatRoomNo);

	    if (messages == null || messages.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("메시지가 없습니다.");
	    }

	    return ResponseEntity.ok(messages);
	}
	
//	// 채팅 파일
//	@PostMapping("/chat/uploadFile/{chatRoomNo}")
//	public ResponseEntity<?> uploadFile(
//	    @PathVariable int chatRoomNo,
//	    @RequestParam("file") MultipartFile file,
//	    @RequestParam("userNo") int userNo) {
//
//	    try {
//	        // 1️⃣ 파일 저장 로직
//	        String originalFilename = file.getOriginalFilename();
//	        String savedFilename = UUID.randomUUID() + "_" + originalFilename;
//
//	        File uploadFile = new File("/upload/chat/", savedFilename);
//	        file.transferTo(uploadFile);
//
//	        // 2️⃣ `CHAT_FILE` 테이블에 파일 정보 저장
//	        ChatFile chatFile = new ChatFile();
//	        chatFile.setChatNo(chatRoomNo);
//	        chatFile.setChatOriginFile(originalFilename);
//	        chatFile.setChatChangeFile(savedFilename);
//	        chatFile.setChatFileType(file.getContentType().startsWith("image") ? "image" : "file");
//
//	        chatService.saveChatFile(chatFile);
//
//	        // 3️⃣ WebSocket을 통해 파일 메시지 전송
//	        Chat chat = new Chat();
//	        chat.setChatRoomNo(chatRoomNo);
//	        chat.setUserNo(userNo);
//	        chat.setMessage(""); // 파일이므로 텍스트 메시지는 없음
//	        chat.setReceviedDate(new Timestamp(System.currentTimeMillis())); 
//	        chat.setChatFile(chatFile); // 🔥 파일 정보 포함
//
//	        messagingTemplate.convertAndSend("/sub/chatRoom/" + chatRoomNo, chat);
//
//	        return ResponseEntity.ok(chatFile);
//	    } catch (Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
//	    }
//	}


	
	
	
	@PostMapping("/chat/enter")
	public ResponseEntity<String> enterChatRoom(@RequestBody UserChat userChat) {
	    try {
	        chatService.insertOrUpdateUserChat(userChat); // `MERGE` 활용으로 insert/update 자동 처리
	        return ResponseEntity.ok("채팅방 입장 성공");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅방 입장 실패");
	    }
	}


	// 마지막으로 읽은 번호 가지고 오기
	@GetMapping("/chat/lastRead/{chatRoomNo}/{userNo}")
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

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
