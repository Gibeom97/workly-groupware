package com.workly.final_project.calendar.model.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.calendar.model.vo.MeetingReservation;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MeetingReservationDaoImpl implements MeetingReservationDao {

    private final SqlSession sqlSession;

    // ✅ 모든 회의실 예약 조회
    @Override
    public List<MeetingReservation> getAllReservations() {
        return sqlSession.selectList("meetingReservationMapper.getAllReservations");
    }

    // ✅ 특정 유저의 회의실 예약 조회
    @Override
    public List<MeetingReservation> getReservationsByUser(int userNo) {
        return sqlSession.selectList("meetingReservationMapper.getReservationsByUser", userNo);
    }

    // ✅ 특정 회의실의 예약 목록 조회
    @Override
    public List<MeetingReservation> getReservationsByRoom(int mrNo) {
        return sqlSession.selectList("meetingReservationMapper.getReservationsByRoom", mrNo);
    }

    // ✅ 회의실 예약 추가
    @Override
    public int insertReservation(MeetingReservation reservation) {
        return sqlSession.insert("meetingReservationMapper.insertReservation", reservation);
    }


    // ✅ 회의실 예약 수정
    @Override
    public int updateReservation(MeetingReservation reservation) {
        return sqlSession.update("meetingReservationMapper.updateReservation", reservation);
    }

    // ✅ 회의실 예약 삭제
    @Override
    public int deleteReservation(int mrResNo) {
        return sqlSession.delete("meetingReservationMapper.deleteReservation", mrResNo);
    }
    
    @Override
    public List<MeetingReservation> getOverlappingReservations(int mrNo, Date startTime, Date endTime) {
        // 파라미터를 맵으로 감싸거나, @Param 어노테이션을 사용해도 됩니다.
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("mrNo", mrNo);
        paramMap.put("startTime", startTime);
        paramMap.put("endTime", endTime);

        return sqlSession.selectList("meetingReservationMapper.getOverlappingReservations", paramMap);
    }
}
