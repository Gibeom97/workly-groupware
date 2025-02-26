package com.workly.final_project.calendar.model.dao;

import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;

import java.util.List;

public interface CalendarDao {

	// ✅ 일정 조회 관련 메서드 (개인 & 팀)
    List<Calendar> selectMyEvents(int userNo);  // 내 일정 조회
    List<Calendar> selectTeamEvents(int deptNo); // 팀 일정 조회

    int insertEvent(Calendar calendar);
    int updateEvent(Calendar calendar);
    int deleteEvent(int calNo);

    // ✅ 회의실 예약 관련 기능
    List<MeetingReservation> selectMeetingReservations();
    int insertMeetingReservation(MeetingReservation meeting);
    int updateMeetingReservation(int mrResNo, MeetingReservation meeting);
    int deleteMeetingReservation(int mrResNo);


    // ✅ 메모 관련 기능
    CalendarMemo selectMemo(int userNo);
    int insertMemo(CalendarMemo memo);
    int updateMemo(CalendarMemo memo);
}
