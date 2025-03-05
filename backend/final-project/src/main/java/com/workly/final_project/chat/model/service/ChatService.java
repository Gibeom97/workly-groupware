package com.workly.final_project.chat.model.service;

import java.util.List;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatFile;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

public interface ChatService {
		// 멤버 정보 조회, 즐겨찾기 관련, 채팅방 생성
		List<MemberDeptPositionDTO> getChatMembers();
		int addFavorite(FavoriteDTO favoriteDTO);
		List<MemberDeptPositionDTO> getFavoriteList(int userNo);
		int removeFavorite(FavoriteDTO favoriteDTO);
		List<MemberDeptPositionDTO> searchMember(String userName);
		int createChatRoom(String roomTitle, String chatType, List<Integer> participantNos);
		List<ChatRoom> getChatList(int userNo);

		// 일반 채팅 메세지 저장
		int saveChatMessage(Chat chat);

		// 채팅 메세지 조회
		List<Chat> getChatMessages(int chatRoomNo);

		// STOMP 전용 메소드
		List<Integer> getUserNosByChatRoom(int chatRoomNo);
		//void insertOrUpdateUserChat(UserChat userChat);
		int getLastReadChatNo(int userNo, int chatRoomNo);
		List<String> getDepartmentList();
		
		// 현재 채팅방의 마지막 채팅 번호
		int getLastChatNo(int chatRoomNo);
		
		// userChat 부분 관리
		void insertUserChat(UserChat userChat);
		void updateUserChat(UserChat userChat);
		UserChat getUserChat(int chatRoomNo, int userNo);
		
		
		void enterChatRoom(int userNo, int chatRoomNo);
		void leaveChatRoom(int userNo, int chatRoomNo);
		void updateUserChatStatus(int userNo, int chatRoomNo, int lastReadChatNo);

		// 안읽은 채팅 수 계산
		List<Integer> getUnreadUserList(int chatRoomNo, int lastReadChatNo);
		
		// 채팅방 멤버 추가하기
		void addMembersToChatRoom(int chatRoomNo, List<Integer> userNos);

		

		
}

