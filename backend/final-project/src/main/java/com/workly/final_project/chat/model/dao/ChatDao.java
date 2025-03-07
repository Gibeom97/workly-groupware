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

    // ✅ 사원 목록 조회
    public List<MemberDeptPositionDTO> getChatMembers() {
        return sqlSession.selectList("chat.getChatMembers");
    }

    // ✅ 즐겨찾기 추가
    public int addFavorite(FavoriteDTO favoriteDTO) {
        return sqlSession.insert("chat.addFavorite", favoriteDTO);
    }

    // ✅ 즐겨찾기 목록 조회
    public List<MemberDeptPositionDTO> getFavoriteList(int userNo) {
        return sqlSession.selectList("chat.getFavoriteList", userNo);
    }

    // ✅ 즐겨찾기 삭제
    public int removeFavorite(FavoriteDTO favoriteDTO) {
        return sqlSession.delete("chat.removeFavorite", favoriteDTO);
    }

    // ✅ 유저 검색
    public List<MemberDeptPositionDTO> searchMember(String userName) {
        return sqlSession.selectList("chat.searchMember", userName);
    }

    // ✅ 채팅방 참여자 삽입
    public void insertChatParticipant(Map<String, Object> paramMap) {
        sqlSession.insert("chat.insertChatParticipant", paramMap);
    }

    // ✅ 채팅방 생성
    public int createChatRoom(ChatRoom chatRoom) {
        sqlSession.insert("chat.createChatRoom", chatRoom);
        return chatRoom.getChatRoomNo();
    }

    // ✅ 다음 채팅방 번호 조회
    public int getNextChatRoomNo() {
        return sqlSession.selectOne("chat.getNextChatRoomNo");
    }

    // ✅ 채팅방 목록 조회
    public List<ChatRoom> getChatList(int userNo) {
        return sqlSession.selectList("chat.getChatList", userNo);
    }

    // ✅ 채팅 메시지 목록 조회 (파일 포함)
    public List<Chat> getChatMessagesWithFiles(int chatRoomNo) {
        return sqlSession.selectList("chat.getChatMessagesWithFiles", chatRoomNo);
    }

    // ✅ 특정 채팅방 참여자의 userNo 리스트 조회
    public List<Integer> getUserNosByChatRoom(int chatRoomNo) {
        return sqlSession.selectList("chat.getUserNosByChatRoom", chatRoomNo);
    }

    // ✅ 특정 유저의 마지막 읽은 메시지 조회
    public Integer getLastReadChatNo(int userNo, int chatRoomNo) {
        return sqlSession.selectOne("chat.getLastReadChatNo",
                Map.of("userNo", userNo, "chatRoomNo", chatRoomNo));
    }

    // ✅ 채팅 메시지 저장
    public void saveChatMessage(Chat chat) {
        sqlSession.insert("chat.saveChatMessage", chat);
    }

    // ✅ 특정 유저의 user_chat 정보 조회
    public UserChat getUserChat(int chatRoomNo, int userNo) {
        Map<String, Integer> params = new HashMap<>();
        params.put("chatRoomNo", chatRoomNo);
        params.put("userNo", userNo);
        return sqlSession.selectOne("chat.getUserChat", params);
    }

    // ✅ UserChat 새로 삽입
    public void insertUserChat(UserChat userChat) {
        sqlSession.insert("chat.insertUserChat", userChat);
    }

    // ✅ UserChat 업데이트
    public void updateUserChat(UserChat userChat) {
        sqlSession.update("chat.updateUserChat", userChat);
    }

    // ✅ 부서 목록 조회
    public List<String> getDepartmentList() {
        return sqlSession.selectList("chat.getDepartmentList");
    }

    // ✅ 특정 채팅방의 채팅 메시지 조회
    public List<Chat> getChatMessages(int chatRoomNo) {
        return sqlSession.selectList("chat.getChatMessages", chatRoomNo);
    }

    // ✅ 특정 채팅방의 가장 최근 채팅 번호 조회
    public Integer getLastChatNo(int chatRoomNo) {
        return sqlSession.selectOne("chat.getLastChatNo", chatRoomNo);
    }


	public int countUnreadMessages(int chatRoomNo, int userNo) {
    	return sqlSession.selectOne("chat.countUnreadMessages",
    			Map.of("userNo", userNo, "chatRoomNo", chatRoomNo));
    }

	public void addMembersToChatRoom(int chatRoomNo, List<Integer> userNos) {
		sqlSession.insert("chat.addMembersToChatRoom",  
				Map.of("userNos", userNos, "chatRoomNo", chatRoomNo));
	}
	
	public int deleteChatParticipant(int chatRoomNo, int userNo) {
	    return sqlSession.delete("chat.deleteChatParticipant", Map.of("chatRoomNo", chatRoomNo, "userNo", userNo));
	}

	public int updateMemberStatus(Map<String, Object> params) {
	    return sqlSession.update("chat.updateMemberStatus", params);
	}
	
	// 사내공지 채팅방 생성
	public void createDefaultChatRoom(com.workly.final_project.chat.model.vo.ChatRoom chatRoom) {
	    sqlSession.insert("chat.createDefaultChatRoom", chatRoom);
	}
	
	// 사내공지 채팅방 존재 여부 확인
	public int countDefaultChatRoom() {
	    return sqlSession.selectOne("chat.countDefaultChatRoom");
	}


    	

}
