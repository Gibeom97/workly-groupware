package com.workly.final_project.calendar.model.dao;

import com.workly.final_project.calendar.model.vo.MeetingRoom;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MeetingRoomDaoImpl implements MeetingRoomDao {

    private final SqlSession sqlSession;

    // ✅ 모든 회의실 목록 조회
    @Override
    public List<MeetingRoom> getAllMeetingRooms() {
        return sqlSession.selectList("meetingRoomMapper.getAllMeetingRooms");
    }

    // ✅ 특정 회의실 정보 조회
    @Override
    public MeetingRoom getMeetingRoomById(int mrNo) {
        return sqlSession.selectOne("meetingRoomMapper.getMeetingRoomById", mrNo);
    }
}
