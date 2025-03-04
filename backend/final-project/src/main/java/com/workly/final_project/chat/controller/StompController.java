package com.workly.final_project.chat.controller;
import java.security.Principal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
     @MessageMapping("/chat/sendMessage/{roomNo}")
        public void sendMessage(@DestinationVariable int roomNo, @Payload Chat chat) {
            log.info(":말풍선: [WebSocket] 메시지 수신: roomNo={}, message={}", roomNo, chat);
            // :흰색_확인_표시: 메시지를 DB에 저장
            try {
                chatService.saveChatMessage(chat);
                log.info(":흰색_확인_표시: [DB 저장 완료] 저장된 메시지: {}", chat);
            } catch (Exception e) {
                log.error(":x: [DB 저장 실패]", e);
            }
            // :흰색_확인_표시: 저장된 메시지를 다시 클라이언트로 전송 (실시간 반영)
            messagingTemplate.convertAndSend("/sub/chatRoom/" + roomNo, chat);
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
    // 채팅방 나가기(진짜로 나가는거 x)
    @PostMapping("/api/chat/exit")
    public ResponseEntity<String> exitChatRoom(@RequestBody UserChat userChat) {
        try {
            int userNo = userChat.getUserNo();
            int chatRoomNo = userChat.getChatRoomNo();
            // :흰색_확인_표시: 마지막으로 본 메시지 번호 가져오기
            int lastReadChatNo = chatService.getLastChatNo(chatRoomNo);
            userChat.setLastReadChatNo(lastReadChatNo);
            // :흰색_확인_표시: USER_CHAT 업데이트
            chatService.updateUserChat(userChat);
            log.info(":작은_파란색_다이아몬드: [Chat Exit] USER_CHAT 업데이트 (lastReadChatNo: {})", lastReadChatNo);
            return ResponseEntity.ok("채팅방 나가기 성공");
        } catch (Exception e) {
            log.error(":x: 채팅방 나가기 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅방 나가기 실패");
        }
    }
    @MessageMapping("/chat/enter")
    public void enterChatRoom(@Payload int chatRoomNo, Principal principal) {
        int userNo = Integer.parseInt(principal.getName());
        chatService.enterChatRoom(userNo, chatRoomNo);
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
            log.error(":x: lastReadChatNo 조회 실패", e);
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