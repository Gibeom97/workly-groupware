package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.dao.CalendarDao;
import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarDao calendarDao;

    // ✅ 1. 내 일정 조회
    @Override
    public List<Calendar> getUserEvents(int userNo) {
        return calendarDao.selectMyEvents(userNo);
    }

    // ✅ 2. 팀 일정 조회
    @Override
    public List<Calendar> getTeamEvents(int deptNo) {
        return calendarDao.selectTeamEvents(deptNo);
    }

    // ✅ 3. 일정 추가🚀
    @Transactional
    @Override
    public void addEvent(Calendar calendar) {
        log.debug("📌 일정 추가 요청 데이터: {}", calendar); // ✅ 로그로 확인
        log.debug("📌 startDate 값: {}", calendar.getStartDate()); // ✅ startDate 값 직접 확인

        if (calendar.getStartDate() == null) {
            log.error("🚨 ERROR: startDate 값이 NULL 입니다!");
        }

        calendarDao.insertEvent(calendar);
    }


    // ✅ 4. 일정 수정🚀
    @Transactional
    @Override
    public void updateEvent(int calNo, Calendar calendar) {
        calendar.setCalNo(calNo);
        calendarDao.updateEvent(calendar);
    }

    // ✅ 5. 일정 삭제🚀
    @Transactional
    @Override
    public void deleteEvent(int calNo) {
        calendarDao.deleteEvent(calNo);
    }

    // ✅ 6. 회의실 예약 조회
    @Override
    public List<MeetingReservation> getMeetingReservations() {
        return calendarDao.selectMeetingReservations();
    }

    // ✅ 7. 회의실 예약 추가🚀
    @Transactional
    @Override
    public void addMeetingReservation(MeetingReservation meeting) {
        if (meeting.getRoomNo() == 0) {
            meeting.setRoomNo(1);  // 기본값 설정
        }
        calendarDao.insertMeetingReservation(meeting);
    }


    // ✅ 8. 회의실 예약 수정🚀
    @Transactional
    @Override
    public void updateMeetingReservation(int mrResNo, MeetingReservation meeting) {
        if (meeting.getRoomNo() == 0) {
            meeting.setRoomNo(1);  // 기본값 설정
        }
        calendarDao.updateMeetingReservation(mrResNo, meeting);
    }


    // ✅ 9. 회의실 예약 삭제🚀
    @Transactional
    @Override
    public void deleteMeetingReservation(int mrResNo) {
        calendarDao.deleteMeetingReservation(mrResNo);
    }

}
