package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.dao.CalendarDao;
import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarDao calendarDao;

    // ✅ 1. 일정 조회 (개인 & 팀)
    @Override
    public List<Calendar> getEvents(Integer userNo, Integer deptNo) {
        return calendarDao.selectEvents(userNo, deptNo);
    }

    // ✅ 2. 일정 추가
    @Transactional
    @Override
    public void addEvent(Calendar calendar) {
        // ✅ deptNo 또는 mrResNo가 없는 경우 null로 처리
        if (calendar.getDeptNo() == null) {
            calendar.setDeptNo(null);
        }
        if (calendar.getMrResNo() == null) {
            calendar.setMrResNo(null);
        }
        calendarDao.insertEvent(calendar);
    }

    // ✅ 3. 일정 수정
    @Transactional
    @Override
    public void updateEvent(int calNo, Calendar calendar) {
        calendar.setCalNo(calNo);
        calendarDao.updateEvent(calendar);
    }

    // ✅ 4. 일정 삭제
    @Transactional
    @Override
    public void deleteEvent(int calNo) {
        calendarDao.deleteEvent(calNo);
    }

    // ✅ 5. 회의실 예약 조회
    @Override
    public List<MeetingReservation> getMeetingReservations() {
        return calendarDao.selectMeetingReservations();
    }

    // ✅ 6. 회의실 예약 추가
    @Transactional
    @Override
    public void addMeetingReservation(MeetingReservation meeting) {
        calendarDao.insertMeetingReservation(meeting);
    }

    // ✅ 7. 회의실 예약 수정
    @Transactional
    @Override
    public void updateMeetingReservation(int resNo, MeetingReservation meeting) {
        meeting.setResNo(resNo);
        calendarDao.updateMeetingReservation(meeting);
    }

    // ✅ 8. 회의실 예약 삭제
    @Transactional
    @Override
    public void deleteMeetingReservation(int resNo) {
        calendarDao.deleteMeetingReservation(resNo);
    }

    // ✅ 9. 메모 조회
    @Override
    public CalendarMemo getMemo(int userNo) {
        return calendarDao.selectMemo(userNo);
    }

    // ✅ 10. 메모 저장
    @Transactional
    @Override
    public void saveMemo(CalendarMemo memo) {
        calendarDao.insertMemo(memo);
    }

    // ✅ 11. 메모 수정
    @Transactional
    @Override
    public void updateMemo(int userNo, CalendarMemo memo) {
        memo.setUserNo(userNo);
        calendarDao.updateMemo(memo);
    }
}
