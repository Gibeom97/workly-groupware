package com.workly.final_project.chat.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.chat.model.dao.ChatDao;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatFile;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.chat.model.dto.FavoriteDTO;
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

	@Override
	public List<Integer> getUnreadUserList(int chatRoomNo, int lastReadChatNo) {
		// TODO Auto-generated method stub
		return null;
	}

	// 채팅방에 멤버 추가하기
	@Override
	public void addMembersToChatRoom(int chatRoomNo, List<Integer> userNos) {
		 chatDao.addMembersToChatRoom(chatRoomNo, userNos);
		
	}
	









}
