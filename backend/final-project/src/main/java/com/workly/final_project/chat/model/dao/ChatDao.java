package com.workly.final_project.chat.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.chat.model.dto.FavoriteDTO;
import com.workly.final_project.chat.model.vo.Chat;
import com.workly.final_project.chat.model.vo.ChatFile;
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
        System.out.println("🔹 DB에 추가할 즐겨찾기 데이터: " + favoriteDTO);
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
        return chatRoom.getChatRoomNo(); // 자동 생성된 chatRoomNo 반환
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
        List<Integer> userNos = sqlSession.selectList("chat.getUserNosByChatRoom", chatRoomNo);
        System.out.println("✅ [ChatDao] 채팅방 참여자 userNos: " + userNos);
        return userNos;
    }

    // ✅ 채팅방 입장 또는 업데이트
    public void insertOrUpdateUserChat(UserChat userChat) {
        sqlSession.insert("chat.insertOrUpdateUserChat", userChat);
    }

    // ✅ 특정 유저의 마지막 읽은 메시지 조회
    public Integer getLastReadChatNo(int userNo, int chatRoomNo) {
        return sqlSession.selectOne("chat.getLastReadChatNo", 
            Map.of("userNo", userNo, "chatRoomNo", chatRoomNo));
    }

    // ✅ 채팅 메시지 저장
    public void saveChatMessage(Chat chat) {
        System.out.println("🟢 Chat 저장 완료. chatNo: " + chat.getChatNo());
        sqlSession.insert("chat.saveChatMessage", chat);
    }

    // ✅ 특정 유저의 마지막 읽은 메시지 조회
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


	public List<Chat> getChatMessages(int chatRoomNo) {
		return sqlSession.selectList("chat.getChatMessages",chatRoomNo);
	}
}
