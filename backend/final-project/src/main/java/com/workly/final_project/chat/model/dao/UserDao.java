package com.workly.final_project.chat.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

@Repository
public class UserDao {

    @Autowired
    private SqlSession sqlSession;

    public String getProfileImg(int userNo) {
        return sqlSession.selectOne("chat.getChatProfile", userNo);
    }

    public void updateChatProfile(int userNo, String profilePath) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("userNo", userNo);
        paramMap.put("profileImg", profilePath);
        sqlSession.update("chat.updateChatProfile", paramMap);
    }

    public void insertProfile(int userNo, String profilePath) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("userNo", userNo);
        paramMap.put("profileImg", profilePath);
        sqlSession.insert("chat.insertProfile", paramMap);
    }
    
    // 나를 제외한 멤버 가져오기
    public List<MemberDeptPositionDTO> getChatMembersWithoutMe(int chatRoomNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("chatRoomNo", chatRoomNo);
        params.put("userNo", userNo);
        return sqlSession.selectList("chat.getChatMembersWithoutMe", params);
    }

}
