package com.workly.final_project.chat.model.service;

import java.util.List;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

public interface ChatService {

		List<MemberDeptPositionDTO> getChatMembers();

		int addFavorite(FavoriteDTO favoriteDTO);
	

		List<MemberDeptPositionDTO> getFavoriteList(int userNo);

		int removeFavorite(FavoriteDTO favoriteDTO);

		List<MemberDeptPositionDTO> searchMember(String userName);

		int createChatRoom(String roomTitle, String chatType, List<Integer> participantNos);

		List<ChatRoom> getChatList(int userNo);

		int saveChatMessage(Chat chat);

		List<Chat> getChatMessages(int chatRoomNo);

		List<Integer> getUserNosByChatRoom(int chatRoomNo);

//		 int insertUserChat(UserChat userChat);
//		 
//	    void updateLastReadChatNo(UserChat userChat);
//	    
//	    int getLastReadChatNo(int userNo, int chatRoomNo);

		
}
