package com.workly.final_project.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatRoom;
import com.workly.final_project.chat.model.vo.UserChat;
import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatDao {

    private final SqlSession sqlSession;

    public List<MemberDeptPositionDTO> getChatMembers() {
        return sqlSession.selectList("chat.getChatMembers");
    }

	public int addFavorite(FavoriteDTO favoriteDTO) {
		System.out.println("🔹 DB에 추가할 즐겨찾기 데이터: " + favoriteDTO);
		return sqlSession.insert("chat.addFavorite", favoriteDTO);
	
	}

	public List<MemberDeptPositionDTO> getFavoriteList(int userNo) {
		return sqlSession.selectList("chat.getFavoriteList", userNo);
	}

	public int removeFavorite(FavoriteDTO favoriteDTO) {
		return sqlSession.delete("chat.removeFavorite", favoriteDTO);
	
	}

	public List<MemberDeptPositionDTO> searchMember(String userName) {
		return sqlSession.selectList("chat.searchMember",userName);
	
	}

	public void insertChatParticipant(Map<String, Object> paramMap) {
	    sqlSession.insert("chat.insertChatParticipant", paramMap);
	}

	public int createChatRoom(ChatRoom chatRoom) {
		 sqlSession.insert("chat.createChatRoom", chatRoom);
		    return chatRoom.getChatRoomNo(); // 자동 할당된 chatRoomNo 반환;

	}

	public int getNextChatRoomNo() {
	    return sqlSession.selectOne("chat.getNextChatRoomNo");
	}

	
	public List<ChatRoom> getChatList(int userNo) {
		return sqlSession.selectList("chat.getChatList", userNo);
	}

	public int saveChatMessage(Chat chat) {
		return sqlSession.insert("chat.saveChatMessage", chat);
	}

	public List<Chat> getChatMessages(int chatRoomNo){
		return sqlSession.selectList("chat.getChatMessages", chatRoomNo);
	}
	
	public List<Integer> getUserNosByChatRoom(int chatRoomNo) {
	    List<Integer> userNos = sqlSession.selectList("chat.getUserNosByChatRoom", chatRoomNo);
	    System.out.println("✅ [ChatDao] 채팅방 참여자 userNos: " + userNos);
	    return userNos;
	}


	
//	// 채팅방 참여 시 UserChat에 추가
//	public int insertUserChat(UserChat userChat) {
//		return sqlSession.insert("chat.insertUserChat", userChat);
//	}
//	
//	public void updateLastReadChatNo(UserChat userChat) {
//		sqlSession.update("chat.updateLastReadChatNo", userChat);
//	}
//
//	public int getLastReadChatNo(int userNo, int chatRoomNo) {
//		return sqlSession.selectOne("chat.getLastReadChatNo", Map.of("userNo", userNo, "chatRoomNo", chatRoomNo));
//	}
	
	
	
	
	
	
	

}
