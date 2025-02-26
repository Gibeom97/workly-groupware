package com.workly.final_project.calendar.model.dao;

import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;

import java.util.List;

public interface CalendarDao {

    // ✅ 일정 (개인 & 팀) 관련 기능
    List<Calendar> selectEvents(Integer userNo, Integer deptNo);
    int insertEvent(Calendar calendar);
    int updateEvent(Calendar calendar);
    int deleteEvent(int calNo);

    // ✅ 회의실 예약 관련 기능
    List<MeetingReservation> selectMeetingReservations();
    int insertMeetingReservation(MeetingReservation meeting);
    int updateMeetingReservation(MeetingReservation meeting);
    int deleteMeetingReservation(int resNo);

    // ✅ 메모 관련 기능
    CalendarMemo selectMemo(int userNo);
    int insertMemo(CalendarMemo memo);
    int updateMemo(CalendarMemo memo);
}
