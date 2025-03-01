package com.workly.final_project.chat.model.dao;

import java.util.HashMap;
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

	public List<Chat> getChatMessages(int chatRoomNo){
		return sqlSession.selectList("chat.getChatMessages", chatRoomNo);
	}
	
	public List<Integer> getUserNosByChatRoom(int chatRoomNo) {
	    List<Integer> userNos = sqlSession.selectList("chat.getUserNosByChatRoom", chatRoomNo);
	    System.out.println("✅ [ChatDao] 채팅방 참여자 userNos: " + userNos);
	    return userNos;
	}

	public void insertOrUpdateUserChat(UserChat userChat) {
	    sqlSession.insert("chat.insertOrUpdateUserChat", userChat);
	}
	
	public Integer getLastReadChatNo(int userNo, int chatRoomNo) {
	    return sqlSession.selectOne("chat.getLastReadChatNo", 
	        Map.of("userNo", userNo, "chatRoomNo", chatRoomNo));
	}
	
	// 🔹 채팅 메시지 저장
    public void saveChatMessage(Chat chat) {
    	System.out.println("🟢 Chat 저장 완료. chatNo: " + chat.getChatNo());
        sqlSession.insert("ChatMapper.saveChatMessage", chat);
    }

    // 🔹 특정 유저의 마지막 읽은 메시지 조회
    public UserChat getUserChat(int chatRoomNo, int userNo) {
        Map<String, Integer> params = new HashMap<>();
        params.put("chatRoomNo", chatRoomNo);
        params.put("userNo", userNo);
        return sqlSession.selectOne("ChatMapper.getUserChat", params);
    }

    // 🔹 UserChat 새로 삽입
    public void insertUserChat(UserChat userChat) {
        sqlSession.insert("ChatMapper.insertUserChat", userChat);
    }

    // 🔹 UserChat 업데이트
    public void updateUserChat(UserChat userChat) {
        sqlSession.update("ChatMapper.updateUserChat", userChat);
    }

	public List<String> getDepartmentList() {
		return sqlSession.selectList("chat.getDepartmentList");
	}
}

	
	
	
	
	

	


