package com.workly.final_project.calendar.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import com.workly.final_project.calendar.model.vo.MeetingReservation;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CalendarDaoImpl implements CalendarDao {

    private final SqlSession sqlSession;

    // ✅ 1. 내 일정 조회 (기존 selectEvents()를 분리)
    @Override
    public List<Calendar> selectMyEvents(int userNo) {
        return sqlSession.selectList("calendarMapper.selectMyEvents", userNo);
    }

    // ✅ 2. 팀 일정 조회 (기존 selectEvents()를 분리)
    @Override
    public List<Calendar> selectTeamEvents(int deptNo) {
        return sqlSession.selectList("calendarMapper.selectTeamEvents", deptNo);
    }

    // ✅ 3. 일정 추가
    @Override
    public int insertEvent(Calendar calendar) {
        return sqlSession.insert("calendarMapper.insertEvent", calendar);
    }

    // ✅ 4. 일정 수정
    @Override
    public int updateEvent(Calendar calendar) {
        return sqlSession.update("calendarMapper.updateEvent", calendar);
    }

    // ✅ 5. 일정 삭제
    @Override
    public int deleteEvent(int calNo) {
        return sqlSession.delete("calendarMapper.deleteEvent", calNo);
    }
}
