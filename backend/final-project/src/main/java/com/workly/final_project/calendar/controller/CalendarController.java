package com.workly.final_project.calendar.controller;

import com.workly.final_project.calendar.model.service.CalendarService;
import com.workly.final_project.calendar.model.vo.Calendar;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class CalendarController {

    private final CalendarService calendarService;

    // ✅ 1. 내 일정 & 팀 일정 조회
    @GetMapping("/calendar")
    public ResponseEntity<List<Calendar>> getAllEvents(
            @RequestParam(required = false) Integer userNo, 
            @RequestParam(required = false) Integer deptNo) {
        log.debug("GET /calendar - userNo: {}, deptNo: {}", userNo, deptNo);
        return ResponseEntity.ok(calendarService.getEvents(userNo, deptNo));
    }

    // ✅ 2. 일정 추가
    @PostMapping("/calendar")
    public ResponseEntity<String> addEvent(@RequestBody Calendar calendar) {
        log.debug("POST /calendar - event: {}", calendar);
        calendarService.addEvent(calendar);
        return ResponseEntity.ok("일정이 추가되었습니다.");
    }

    // ✅ 3. 일정 수정
    @PutMapping("/calendar/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable("id") int calNo, @RequestBody Calendar calendar) {
        log.debug("PUT /calendar/{} - event: {}", calNo, calendar);
        calendarService.updateEvent(calNo, calendar);
        return ResponseEntity.ok("일정이 수정되었습니다.");
    }

    // ✅ 4. 일정 삭제
    @DeleteMapping("/calendar/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") int calNo) {
        log.debug("DELETE /calendar/{} - event", calNo);
        calendarService.deleteEvent(calNo);
        return ResponseEntity.ok("일정이 삭제되었습니다.");
    }

    // ✅ 5. 회의실 예약 조회
    @GetMapping("/meeting-reservation")
    public ResponseEntity<List<MeetingReservation>> getAllMeetingReservations() {
        log.debug("GET /meeting-reservation");
        return ResponseEntity.ok(calendarService.getMeetingReservations());
    }

    // ✅ 6. 회의실 예약 추가
    @PostMapping("/meeting-reservation")
    public ResponseEntity<String> addMeetingReservation(@RequestBody MeetingReservation meeting) {
        log.debug("POST /meeting-reservation - meeting: {}", meeting);
        calendarService.addMeetingReservation(meeting);
        return ResponseEntity.ok("회의실 예약이 추가되었습니다.");
    }

    // ✅ 7. 회의실 예약 수정
    @PutMapping("/meeting-reservation/{id}")
    public ResponseEntity<String> updateMeetingReservation(
            @PathVariable("id") int resNo, @RequestBody MeetingReservation meeting) {
        log.debug("PUT /meeting-reservation/{} - meeting: {}", resNo, meeting);
        calendarService.updateMeetingReservation(resNo, meeting);
        return ResponseEntity.ok("회의실 예약이 수정되었습니다.");
    }

    // ✅ 8. 회의실 예약 삭제
    @DeleteMapping("/meeting-reservation/{id}")
    public ResponseEntity<String> deleteMeetingReservation(@PathVariable("id") int resNo) {
        log.debug("DELETE /meeting-reservation/{} - meeting", resNo);
        calendarService.deleteMeetingReservation(resNo);
        return ResponseEntity.ok("회의실 예약이 삭제되었습니다.");
    }

    // ✅ 9. 메모 조회
    @GetMapping("/memo/{userNo}")
    public ResponseEntity<CalendarMemo> getMemo(@PathVariable("userNo") int userNo) {
        log.debug("GET /memo/{}", userNo);
        return ResponseEntity.ok(calendarService.getMemo(userNo));
    }

    // ✅ 10. 메모 저장
    @PostMapping("/memo")
    public ResponseEntity<String> saveMemo(@RequestBody CalendarMemo memo) {
        log.debug("POST /memo - memo: {}", memo);
        calendarService.saveMemo(memo);
        return ResponseEntity.ok("메모가 저장되었습니다.");
    }

    // ✅ 11. 메모 수정
    @PutMapping("/memo/{userNo}")
    public ResponseEntity<String> updateMemo(@PathVariable("userNo") int userNo, @RequestBody CalendarMemo memo) {
        log.debug("PUT /memo/{} - memo: {}", userNo, memo);
        calendarService.updateMemo(userNo, memo);
        return ResponseEntity.ok("메모가 수정되었습니다.");
    }
}
