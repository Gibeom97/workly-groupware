package com.workly.final_project.chat.controller;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.workly.final_project.chat.model.dto.ChatStatusUpdateDTO;
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
    // 채팅 메세지 저장 및 전송 + 알림
    @MessageMapping("/chat/sendMessage/{chatRoomNo}")
    public void sendMessage(@DestinationVariable int chatRoomNo, @Payload Chat chat) {
        log.info(":말풍선: [WebSocket] 메시지 수신: roomNo={}, message={}",chatRoomNo, chat);
        try {
            chatService.saveChatMessage(chat);
            log.info(":흰색_확인_표시: [DB 저장 완료] 저장된 메시지: {}", chat);
        } catch (Exception e) {
            log.error(":x: [DB 저장 실패]", e);
        }
        
        // 기존 채팅 메시지 전송 (실시간 반영)
        messagingTemplate.convertAndSend("/sub/chatRoom/" + chatRoomNo, chat);
        
        // 추가: 알림 전송
        List<Integer> unreadUserNos = chatService.getUnreadUserList(chatRoomNo, chat.getChatNo());
     // 서버 측 로그 추가
        log.info("알림 전송 대상: " + unreadUserNos);
        for (Integer userNo : unreadUserNos) {
            Map<String, String> notif = new HashMap<>();
            notif.put("message", "새 메시지가 도착했습니다 in room " + chatRoomNo);
            messagingTemplate.convertAndSendToUser(String.valueOf(userNo), "/queue/notifications", notif);
            log.info("알림 전송: " + userNo);
        }


    }
    
    
 // NoticeChat 기본 채팅방 (chatRoomNo = 0) 실시간 메시지 처리 
    @MessageMapping("/noticeChat/sendMessage")
    public void sendNoticeChatMessage(@Payload Chat chat) {
        if (chat.getChatRoomNo() != 0) {
            log.warn("NoticeChat 메시지는 chatRoomNo가 0이어야 합니다.");
            return;
        }
        log.info("[NoticeChat] 메시지 수신: {}", chat);
        try {
            chatService.saveChatMessage(chat);
            log.info("[NoticeChat] 메시지 저장 완료: {}", chat);
        } catch (Exception e) {
            log.error("[NoticeChat] 메시지 저장 실패", e);
            return;
        }
        // 기본 채팅방 구독 경로: "/sub/noticeChat"
        messagingTemplate.convertAndSend("/sub/noticeChat", chat);
        
        // (선택사항) 알림 전송 처리
        List<Integer> unreadUserNos = chatService.getUnreadUserList(0, chat.getChatNo());
        for (Integer userNo : unreadUserNos) {
            Map<String, String> notif = new HashMap<>();
            notif.put("message", "새 메시지가 도착했습니다 in 사내 공지 톡방");
            messagingTemplate.convertAndSendToUser(String.valueOf(userNo), "/queue/notifications", notif);
        }
    }
    
 // 새로운 STOMP 엔드포인트: 상태 업데이트 요청 처리
    @MessageMapping("/chat/statusUpdate")
    public void updateStatus(@Payload ChatStatusUpdateDTO statusDTO) {
        log.info("STOMP 상태 업데이트 요청: {}", statusDTO);
        int result = chatService.updateMemberStatus(statusDTO.getUserNo(), statusDTO.getStatusType());
        if(result > 0) {
            String statusString = (statusDTO.getStatusType() == 2) ? "활성화" : "비활성";
            ChatStatusUpdateDTO updatedDTO = new ChatStatusUpdateDTO(statusDTO.getUserNo(), statusDTO.getStatusType(), statusString);
            messagingTemplate.convertAndSend("/sub/status", updatedDTO);
            log.info("상태 업데이트 브로드캐스트 완료: {}", updatedDTO);
        } else {
            log.error("상태 업데이트 실패: userNo={}, statusType={}", statusDTO.getUserNo(), statusDTO.getStatusType());
        }
    }

     //채팅 메세지 목록 조회
    @GetMapping("/api/chat/messages/{chatRoomNo}")
    public ResponseEntity<?> getChatMessages(@PathVariable int chatRoomNo) {
        List<Chat> messages = chatService.getChatMessages(chatRoomNo);
        if (messages == null || messages.isEmpty()) {
            return ResponseEntity.ok(List.of()); 
        }
        return ResponseEntity.ok(messages);
    }
    // 채팅방 나가기(진짜로 나가는거 x)
    @PostMapping("/api/chat/leave") // 관련 주소 exit에서 leave로 변경
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