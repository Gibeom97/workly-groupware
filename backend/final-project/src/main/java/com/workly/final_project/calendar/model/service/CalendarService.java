package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;

import java.util.List;

public interface CalendarService {

    // ✅ 일정 (개인 & 팀) 관련 기능
    List<Calendar> getEvents(Integer userNo, Integer deptNo);
    void addEvent(Calendar calendar);
    void updateEvent(int calNo, Calendar calendar);
    void deleteEvent(int calNo);

    // ✅ 회의실 예약 관련 기능
    List<MeetingReservation> getMeetingReservations();
    void addMeetingReservation(MeetingReservation meeting);
    void updateMeetingReservation(int resNo, MeetingReservation meeting);
    void deleteMeetingReservation(int resNo);

    // ✅ 메모 관련 기능
    CalendarMemo getMemo(int userNo);
    void saveMemo(CalendarMemo memo);
    void updateMemo(int userNo, CalendarMemo memo);
}
