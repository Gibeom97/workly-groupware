package com.workly.final_project.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.ChatRoom;
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
		return sqlSession.selectList("chat.getChatList");
	}


	

}
