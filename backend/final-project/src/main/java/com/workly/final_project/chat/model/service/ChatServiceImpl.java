package com.workly.final_project.chat.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.chat.model.dao.ChatDao;
import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatDao chatDao;

    @Override
    public List<MemberDeptPositionDTO> getChatMembers() {
        return chatDao.getChatMembers();
    }

    @Override
    public int addFavorite(FavoriteDTO favoriteDTO) {
        return chatDao.addFavorite(favoriteDTO);
    }

    @Override
    public List<MemberDeptPositionDTO> getFavoriteList(int userNo) {
        return chatDao.getFavoriteList(userNo);
    }

    @Override
    public int removeFavorite(FavoriteDTO favoriteDTO) {
        return chatDao.removeFavorite(favoriteDTO);
    }

    @Override
    public List<MemberDeptPositionDTO> searchMember(String userName) {
        return chatDao.searchMember(userName);
    }

    @Override
    @Transactional
    public int createChatRoom(String roomTitle, String chatType, List<Integer> participantNos) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomTitle(roomTitle);
        chatRoom.setChatType(chatType);

        chatDao.createChatRoom(chatRoom);
        int chatRoomNo = chatRoom.getChatRoomNo();
        
        if (chatRoomNo <= 0) {
            throw new RuntimeException("❌ 채팅방 번호 생성 실패");
        }

        // 참가자 추가
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("chatRoomNo", chatRoomNo);
        paramMap.put("userNos", participantNos);
        chatDao.insertChatParticipant(paramMap);

        return chatRoomNo;
    }

    @Override
    public List<ChatRoom> getChatList(int userNo) {
        return chatDao.getChatList(userNo);
    }

    @Override
    @Transactional
    public int saveChatMessage(Chat chat) {
        log.info("🟢 채팅 저장 요청: {}", chat);

        chatDao.saveChatMessage(chat);
        log.info("✅ 채팅 저장 완료. chatNo: {}", chat.getChatNo());

        // ✅ 메시지를 보낸 사용자의 USER_CHAT 업데이트
        UserChat senderUserChat = chatDao.getUserChat(chat.getChatRoomNo(), chat.getUserNo());

        if (senderUserChat == null) {
            // ✅ USER_CHAT이 존재하지 않으면 새로 삽입
            chatDao.insertUserChat(new UserChat(chat.getUserNo(), chat.getChatRoomNo(), chat.getChatNo()));
            log.info("🔹 [Chat Send] 새로운 USER_CHAT 삽입 (lastReadChatNo: {})", chat.getChatNo());
        } else {
            // ✅ 보낸 사람의 LAST_READ_CHAT_NO 갱신
            senderUserChat.setLastReadChatNo(chat.getChatNo());
            chatDao.updateUserChat(senderUserChat);
            log.info("🔹 [Chat Send] 보낸 사람의 USER_CHAT 업데이트 (lastReadChatNo: {})", chat.getChatNo());
        }

        return chat.getChatNo();
    }




    @Override
    public List<Chat> getChatMessages(int chatRoomNo) {
        return chatDao.getChatMessages(chatRoomNo);
    }


    @Override
    public List<Integer> getUserNosByChatRoom(int chatRoomNo) {
        return chatDao.getUserNosByChatRoom(chatRoomNo);
    }

//    @Override
//    public void insertOrUpdateUserChat(UserChat userChat) {
//        chatDao.insertOrUpdateUserChat(userChat);
//    }

    @Override
    public int getLastReadChatNo(int userNo, int chatRoomNo) {
        Integer lastReadChatNo = chatDao.getLastReadChatNo(userNo, chatRoomNo);
        return (lastReadChatNo != null) ? lastReadChatNo : 0;
        
//      UserChat userChat = new UserChat();
//      userChat.setChatRoomNo(chat.getChatRoomNo());
//      userChat.setUserNo(chat.getUserNo());
//      userChat.setLastReadChatNo(chat.getChatNo());
//
//      UserChat existingUserChat = chatDao.getUserChat(userChat.getChatRoomNo(), userChat.getUserNo());
//      if (existingUserChat == null) {
//          chatDao.insertUserChat(userChat);
//      } else {
//          chatDao.updateUserChat(userChat);
//      }
    }

    @Override
    public List<String> getDepartmentList() {
        return chatDao.getDepartmentList();
    }

    @Override
    public int getLastChatNo(int chatRoomNo) {
        Integer lastChatNo = chatDao.getLastChatNo(chatRoomNo);
        return (lastChatNo != null) ? lastChatNo : 0;  // 만약 메시지가 없으면 0 반환
    }

    @Override
    public void insertUserChat(UserChat userChat) {
    	log.info("🟢 [DB INSERT] USER_CHAT 삽입 실행: {}", userChat);
        chatDao.insertUserChat(userChat);
    }

    @Override
    public void updateUserChat(UserChat userChat) {
    	log.info("🟡 [DB UPDATE] USER_CHAT 업데이트 실행: {}", userChat);
        chatDao.updateUserChat(userChat);
    }

	@Override
	public UserChat getUserChat(int chatRoomNo, int userNo) {
		return chatDao.getUserChat(chatRoomNo, userNo);
	}
	
	// 채팅방에 들어올 때 
	@Override
	@Transactional
	public void enterChatRoom(int userNo, int chatRoomNo) {
	    // ✅ 해당 채팅방의 마지막 채팅 번호 가져오기
	    Integer lastChatNo = chatDao.getLastChatNo(chatRoomNo);
	    if (lastChatNo == null) lastChatNo = 0;  // 채팅방에 아무 메시지가 없을 경우 기본값 설정

	    // ✅ 현재 유저의 USER_CHAT 정보 가져오기
	    UserChat existingUserChat = chatDao.getUserChat(chatRoomNo, userNo);

	    if (existingUserChat == null) {
	        // 🔹 처음 입장하는 경우 INSERT
	        chatDao.insertUserChat(new UserChat(userNo, chatRoomNo, lastChatNo));
	        log.info("🔹 [Chat Enter] USER_CHAT 없음 → INSERT 실행 (lastReadChatNo: {})", lastChatNo);
	    } else {
	        // 🔹 기존 입장 기록이 있는 경우 UPDATE
	        existingUserChat.setLastReadChatNo(lastChatNo);
	        chatDao.updateUserChat(existingUserChat);
	        log.info("🔹 [Chat Enter] USER_CHAT 있음 → UPDATE 실행 (lastReadChatNo: {})", lastChatNo);
	    }
	}
	
	@Override
	@Transactional
	public void leaveChatRoom(int userNo, int chatRoomNo) {
	    log.info("🔹 [Chat Leave] 채팅방 이동 처리 - userNo: {}, chatRoomNo: {}", userNo, chatRoomNo);

	    // 마지막으로 읽은 채팅 번호 업데이트
	    Integer lastChatNo = chatDao.getLastChatNo(chatRoomNo);
	    if (lastChatNo == null) lastChatNo = 0;

	    UserChat existingUserChat = chatDao.getUserChat(chatRoomNo, userNo);

	    if (existingUserChat != null) {
	        existingUserChat.setLastReadChatNo(lastChatNo);
	        chatDao.updateUserChat(existingUserChat);
	        log.info("🔹 [Chat Leave] USER_CHAT 업데이트 완료 - lastReadChatNo: {}", lastChatNo);
	    } else {
	        log.warn("⚠️ [Chat Leave] 해당 사용자의 USER_CHAT 데이터 없음.");
	    }
	}

	// 실시간으로 읽고 있는 채팅 번호 업데이트
	@Override
	public void updateUserChatStatus(int userNo, int chatRoomNo, int lastReadChatNo) {
		 UserChat existingUserChat = chatDao.getUserChat(chatRoomNo, userNo);
		    
		    if (existingUserChat != null) {
		        existingUserChat.setLastReadChatNo(lastReadChatNo);
		        chatDao.updateUserChat(existingUserChat);
		        log.info("🔹 [실시간 읽음] USER_CHAT 업데이트 완료 - lastReadChatNo: {}", lastReadChatNo);
		    } else {
		        log.warn("⚠️ [실시간 읽음] USER_CHAT 데이터 없음.");
		    }
	}


	// 채팅방에 멤버 추가하기
	@Override
	public void addMembersToChatRoom(int chatRoomNo, List<Integer> userNos) {
		 chatDao.addMembersToChatRoom(chatRoomNo, userNos);
		
	}

	// ChatServiceImpl.java
	@Override
	@Transactional
	public void exitChatRoom(int userNo, int chatRoomNo, String userName) {
	    log.info("🔹 [Chat Exit] 채팅방 종료 처리 - userNo: {}, chatRoomNo: {}", userNo, chatRoomNo);
	    
	    int result = chatDao.deleteChatParticipant(chatRoomNo, userNo);
	    if (result > 0) {
	         // 시스템 메시지 삽입 (그룹 채팅 알림)
	         Chat systemMessage = new Chat();
	         systemMessage.setChatRoomNo(chatRoomNo);
	         systemMessage.setUserNo(userNo);
	         // SYSTEM 혹은 별도의 구분 문자열을 사용해도 되고, 메시지 내용에 실제 이름 포함
	         systemMessage.setUserName("SYSTEM");
	         systemMessage.setMessage(userName + "님이 채팅방을 나갔습니다.");
	         chatDao.saveChatMessage(systemMessage);
	         log.info("🔹 [Chat Exit] 시스템 메시지 삽입 완료");
	    } else {
	         log.warn("⚠️ [Chat Exit] 채팅방 나가기 실패, 해당 참여자 정보가 존재하지 않습니다.");
	    }
	    
}

	@Override
	@Transactional
	public int updateMemberStatus(int userNo, int statusType) {
	    return chatDao.updateMemberStatus(Map.of("userNo", userNo, "statusType", statusType));
	}
	
	// 알림기능 구현?
	@Override
	public List<Integer> getUnreadUserList(int chatRoomNo, int currentChatNo) {
	    List<Integer> participantUserNos = chatDao.getUserNosByChatRoom(chatRoomNo);
	    List<Integer> unreadUserNos = new ArrayList<>();
	    
	    for (Integer userNo : participantUserNos) {
	        // 보낸 사람은 제외 (자기 자신에게 알림 전송할 필요 없음)
	        // 또는 필요에 따라 필터 처리
	        int lastReadChatNo = getLastReadChatNo(userNo, chatRoomNo);
	        if (lastReadChatNo < currentChatNo) {
	            unreadUserNos.add(userNo);
	        }
	    }
	    return unreadUserNos;
	}
	
	// 사내공지 채팅방 생성
	@Override
	@Transactional
	public void createDefaultChatRoom() {
	    // 기본 채팅방 존재 여부 확인 (0번 채팅방)
	    int count = chatDao.countDefaultChatRoom();
	    if (count == 0) {
	        com.workly.final_project.chat.model.vo.ChatRoom defaultRoom = new com.workly.final_project.chat.model.vo.ChatRoom();
	        // 강제로 0번으로 설정 (insert 쿼리에서 0번을 사용하므로 생략 가능)
	        defaultRoom.setRoomTitle("사내 공지 톡방");
	        defaultRoom.setChatType("NOTICE");
	        // createdChat은 SYSDATE로 처리됨
	        chatDao.createDefaultChatRoom(defaultRoom);
	        log.info("기본 채팅방(0번) 생성 완료");
	    } else {
	        log.info("기본 채팅방(0번)이 이미 존재합니다.");
	    }
	}






	









}
