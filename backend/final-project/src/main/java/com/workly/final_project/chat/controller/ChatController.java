package com.workly.final_project.chat.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.service.ChatService;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/chat")
public class ChatController {
		
		private final ChatService chatService;

	    
		@Autowired
		public ChatController(ChatService chatService) {
			this.chatService = chatService;
		}
		
		// 사원 목록
		@GetMapping("/members")
		 public ResponseEntity<List<MemberDeptPositionDTO>> getChatMembers() {
	        List<MemberDeptPositionDTO> members = chatService.getChatMembers();
	        return ResponseEntity.ok(members);
	    }
		
		// 즐겨찾기 추가
		@PostMapping("/favorite")
		public ResponseEntity<String> addFavorite(@RequestBody FavoriteDTO favoriteDTO) {
		    System.out.println("🔹 즐겨찾기 추가 요청 데이터: " + favoriteDTO);
		    
		    try {
		        int result = chatService.addFavorite(favoriteDTO);
		        return ResponseEntity.ok("즐겨찾기 추가 완료 (ID: " + result + ")");
		    } catch (RuntimeException e) {
		        System.err.println("❌ 즐겨찾기 추가 실패: " + e.getMessage());
		        return ResponseEntity.status(500).body("즐겨찾기 추가 실패: " + e.getMessage());
		    }
		}



		
		// 즐겨찾기 리스트 목록
		@GetMapping("/favorite/{userNo}")
		public ResponseEntity<?> getFavoriteList(@PathVariable int userNo) {
		    List<MemberDeptPositionDTO> favorites = chatService.getFavoriteList(userNo);
		    return ResponseEntity.ok().body(Map.of("favorites", favorites));
		}

		
		// 즐겨찾기 삭제
		@DeleteMapping("/favorite")
		public ResponseEntity<String> removeFavorite(@RequestBody FavoriteDTO favoriteDTO) {
		    int result = chatService.removeFavorite(favoriteDTO);
		    if (result > 0) {
		        return ResponseEntity.ok("즐겨찾기 삭제 성공");
		    } else {
		        return ResponseEntity.status(500).body("즐겨찾기 삭제 실패");
		    }
		}

		// 채팅방 생성
		@PostMapping("/createChatRoom")
		public ResponseEntity<?> createChatRoom(@RequestBody Map<String, Object> requestData) {
		    System.out.println("🔥 받은 요청 데이터: " + requestData);

		    String roomTitle = (String) requestData.get("roomTitle");
		    
		    // 🔥 chatType이 null일 경우 대비하여 확실하게 String으로 변환
		    Object chatTypeObj = requestData.get("chatType");
		    String chatType = chatTypeObj != null ? chatTypeObj.toString() : null;

		    Object participantsObj = requestData.get("participants");

		    System.out.println("✅ 받은 roomTitle: " + roomTitle);
		    System.out.println("✅ 받은 chatType: " + chatType);
		    System.out.println("✅ participants 원본 데이터: " + participantsObj);

		    if (!(participantsObj instanceof List)) {
		        return ResponseEntity.badRequest().body("❌ participants 값이 리스트가 아닙니다.");
		    }
		    
		    if (roomTitle.length() > 30) {
		        return ResponseEntity.badRequest().body("❌ 채팅방 제목은 30자 이내여야 합니다.");
		    }


		    List<Integer> participantNos;
		    try {
		        participantNos = (List<Integer>) participantsObj;
		    } catch (ClassCastException e) {
		        return ResponseEntity.badRequest().body("❌ participants 값 변환 실패: " + e.getMessage());
		    }

		    System.out.println("✅ 변환된 participants 리스트: " + participantNos);

		    if (roomTitle == null || chatType == null || participantNos.isEmpty()) {
		        return ResponseEntity.badRequest().body("❌ 필수 데이터가 누락되었습니다.");
		    }

		    int chatRoomNo = chatService.createChatRoom(roomTitle, chatType, participantNos);

		    return ResponseEntity.ok(Map.of(
		        "chatRoomNo", chatRoomNo,
		        "message", "✅ 채팅방 생성 완료"
		    ));
		}

		
		// 채팅방 목록 
		@GetMapping("/list/{userNo}")
		public ResponseEntity<List<ChatRoom>> getChatList (@PathVariable int userNo){
			List<ChatRoom> chatRooms = chatService.getChatList(userNo);
			return ResponseEntity.ok(chatRooms);
		}
		
		// 부서 목록 가져오기
		@GetMapping("/departments")
		public ResponseEntity<List<String>> getDepartments() {
		    List<String> departments = chatService.getDepartmentList();
		    return ResponseEntity.ok(departments);
		}
 
		// userChat 마지막으로 읽은 번호 업데이트 
		@PutMapping("/updateStatus/{chatRoomNo}/{userNo}")
		public ResponseEntity<?> updateUserChatStatus(@PathVariable int chatRoomNo, @PathVariable int userNo) {
		    try {
		        chatService.updateUserChat(new UserChat(userNo, chatRoomNo, chatService.getLastChatNo(chatRoomNo)));
		        return ResponseEntity.ok().body("User chat status updated successfully");
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user chat status");
		    }
		}
		
		// 다른 채팅방으로 이동시
		@PostMapping("/leave/{chatRoomNo}/{userNo}")
		public ResponseEntity<?> leaveChatRoom(@PathVariable int chatRoomNo, @PathVariable int userNo) {
		    log.info("🚪 [API] 채팅방 이동 요청 - userNo: {}, chatRoomNo: {}", userNo, chatRoomNo);
		    chatService.leaveChatRoom(userNo, chatRoomNo);
		    return ResponseEntity.ok().build();
		}
		
		// 새로운 API (lastReadChatNo가 포함된 경우)
		@PutMapping("/updateStatusWithRead/{chatRoomNo}/{userNo}/{lastReadChatNo}")
		public ResponseEntity<Void> updateUserChatStatusWithRead(
		    @PathVariable int chatRoomNo, 
		    @PathVariable int userNo, 
		    @PathVariable int lastReadChatNo
		) {
		    chatService.updateUserChatStatus(userNo, chatRoomNo, lastReadChatNo);
		    return ResponseEntity.ok().build();
		}

		// 안읽은 채팅 수 계산
		@GetMapping("/chat/unreadUsers/{chatRoomNo}/{lastReadChatNo}")
		public List<Integer> getUnreadUsers(
		    @PathVariable int chatRoomNo, 
		    @PathVariable int lastReadChatNo
		) {
		    return chatService.getUnreadUserList(chatRoomNo, lastReadChatNo);
		}
		
		// 채팅방 멤버 추가하기
		@PostMapping("/chat/addMembers")
		public ResponseEntity<String> addMembersToChatRoom(@RequestBody Map<String, Object> requestData) {
		    int chatRoomNo = (int) requestData.get("chatRoomNo");
		    List<Integer> userNos = (List<Integer>) requestData.get("userNos");

		    try {
		        chatService.addMembersToChatRoom(chatRoomNo, userNos);
		        return ResponseEntity.ok("멤버 추가 성공");
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("멤버 추가 실패: " + e.getMessage());
		    }
		}
		
		// 멤버 검색
		 @GetMapping("/search")
		    public ResponseEntity<List<MemberDeptPositionDTO>> searchMember(@RequestParam("userName") String userName) {
		        System.out.println("검색 요청: " + userName); // 확인용
		        List<MemberDeptPositionDTO> members = chatService.searchMember(userName);
		        System.out.println("검색 결과: " + members); // 확인용
		        return ResponseEntity.ok(members);
		    }




	}