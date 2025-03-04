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

        UserChat userChat = new UserChat();
        userChat.setChatRoomNo(chat.getChatRoomNo());
        userChat.setUserNo(chat.getUserNo());
        userChat.setLastReadChatNo(chat.getChatNo());

        UserChat existingUserChat = chatDao.getUserChat(userChat.getChatRoomNo(), userChat.getUserNo());
        if (existingUserChat == null) {
            chatDao.insertUserChat(userChat);
        } else {
            chatDao.updateUserChat(userChat);
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

    @Override
    public void insertOrUpdateUserChat(UserChat userChat) {
        chatDao.insertOrUpdateUserChat(userChat);
    }

    @Override
    public int getLastReadChatNo(int userNo, int chatRoomNo) {
        Integer lastReadChatNo = chatDao.getLastReadChatNo(userNo, chatRoomNo);
        return (lastReadChatNo != null) ? lastReadChatNo : 0;
    }

    @Override
    public List<String> getDepartmentList() {
        return chatDao.getDepartmentList();
    }
}
