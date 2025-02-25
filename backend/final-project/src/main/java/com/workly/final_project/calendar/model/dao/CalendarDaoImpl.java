package com.workly.final_project.calendar.model.dao;

import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CalendarDaoImpl implements CalendarDao {

    private final SqlSession sqlSession;

    // ✅ 1. 일정 조회 (개인 & 팀)
    @Override
    public List<Calendar> selectEvents(Integer userNo, Integer deptNo) {
        if (deptNo != null) {
            return sqlSession.selectList("calendarMapper.selectTeamEvents", deptNo);
        } else {
            return sqlSession.selectList("calendarMapper.selectMyEvents", userNo);
        }
    }

    // ✅ 2. 일정 추가
    @Override
    public int insertEvent(Calendar calendar) {
        return sqlSession.insert("calendarMapper.insertEvent", calendar);
    }

    // ✅ 3. 일정 수정
    @Override
    public int updateEvent(Calendar calendar) {
        return sqlSession.update("calendarMapper.updateEvent", calendar);
    }

    // ✅ 4. 일정 삭제
    @Override
    public int deleteEvent(int calNo) {
        return sqlSession.delete("calendarMapper.deleteEvent", calNo);
    }

    // ✅ 5. 회의실 예약 조회
    @Override
    public List<MeetingReservation> selectMeetingReservations() {
        return sqlSession.selectList("calendarMapper.selectMeetingReservations");
    }

    // ✅ 6. 회의실 예약 추가
    @Override
    public int insertMeetingReservation(MeetingReservation meeting) {
        return sqlSession.insert("calendarMapper.insertMeetingReservation", meeting);
    }

    // ✅ 7. 회의실 예약 수정
    @Override
    public int updateMeetingReservation(MeetingReservation meeting) {
        return sqlSession.update("calendarMapper.updateMeetingReservation", meeting);
    }

    // ✅ 8. 회의실 예약 삭제
    @Override
    public int deleteMeetingReservation(int resNo) {
        return sqlSession.delete("calendarMapper.deleteMeetingReservation", resNo);
    }

    // ✅ 9. 메모 조회
    @Override
    public CalendarMemo selectMemo(int userNo) {
        return sqlSession.selectOne("calendarMapper.selectMemo", userNo);
    }

    // ✅ 10. 메모 추가
    @Override
    public int insertMemo(CalendarMemo memo) {
        return sqlSession.insert("calendarMapper.insertMemo", memo);
    }

    // ✅ 11. 메모 수정
    @Override
    public int updateMemo(CalendarMemo memo) {
        return sqlSession.update("calendarMapper.updateMemo", memo);
    }
}
