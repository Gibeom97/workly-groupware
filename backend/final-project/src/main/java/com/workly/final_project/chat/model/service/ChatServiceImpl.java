package com.workly.final_project.chat.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.chat.model.dao.ChatDao;
import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

	private final ChatDao chatDao;
	
	
	@Override
	public List<MemberDeptPositionDTO> getChatMembers() {
		return chatDao.getChatMembers();
	}

	@Override
	@Transactional
	public int addFavorite(FavoriteDTO favoriteDTO) {
	    try {
	        System.out.println("🔥 DB에 추가할 즐겨찾기 데이터: " + favoriteDTO);

	        // 🎯 userNo 또는 favoriteNo가 0이어도 처리 가능하도록 예외처리 제거
	        int result = chatDao.addFavorite(favoriteDTO);

	        if (result > 0) {
	            return result; // 성공적으로 추가됨
	        } else {
	            throw new RuntimeException("❌ 즐겨찾기 추가 실패: DB에서 삽입되지 않음");
	        }
	    } catch (Exception e) {
	        System.err.println("❌ DB 에러 발생: " + e.getMessage());
	        e.printStackTrace();
	        throw new RuntimeException("즐겨찾기 추가 중 오류 발생: " + e.getMessage());
	    }
	}
	
	// 즐겨찾기 목록 조회
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
	    int chatRoomNo = chatRoom.getChatRoomNo(); // 생성된 채팅방 번호

	    System.out.println("✅ 생성된 채팅방 번호: " + chatRoomNo);  // 디버깅용 로그

	    if (chatRoomNo <= 0) {
	        throw new RuntimeException("❌ 채팅방 번호가 올바르게 생성되지 않았습니다.");
	    }

	    // 참여자 추가
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("chatRoomNo", chatRoomNo);
	    paramMap.put("userNos", participantNos);

	    System.out.println("🔥 참가자 추가 실행: " + paramMap); // 디버깅 로그 추가

	    chatDao.insertChatParticipant(paramMap);

	    return chatRoomNo;
	}

	@Override
	public List<ChatRoom> getChatList(int userNo) {
		return chatDao.getChatList(userNo);
	}










}
