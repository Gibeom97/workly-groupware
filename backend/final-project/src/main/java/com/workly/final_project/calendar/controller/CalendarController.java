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
@RequestMapping // ✅ 전체 API 기본 경로 변경
@CrossOrigin("http://localhost:5173")
public class CalendarController {

    private final CalendarService calendarService;

    // ✅ 1. 내 일정 조회 (수정된 부분)
    @GetMapping("/schedule/user/{userNo}")
    public ResponseEntity<List<Calendar>> getUserEvents(@PathVariable("userNo") int userNo) {
        log.debug("GET /schedule/user/{}", userNo);
        return ResponseEntity.ok(calendarService.getUserEvents(userNo));
    }
    
    // ✅ 1-1. 팀 일정 조회 (수정된 부분)
    @GetMapping("/schedule/team/{deptNo}")
    public ResponseEntity<List<Calendar>> getTeamEvents(@PathVariable("deptNo") int deptNo) {
        log.debug("GET /schedule/team/{}", deptNo);
        return ResponseEntity.ok(calendarService.getTeamEvents(deptNo));
    }
    

    // ✅ 2. 일정 추가
    @PostMapping("/schedule/add")
    public ResponseEntity<String> addEvent(@RequestBody Calendar calendar) {
    	log.debug("📌 [CalendarController] 받은 일정 데이터: {}", calendar);
        log.debug("📌 startDate: {}", calendar.getStartDate());
        log.debug("📌 color: {}", calendar.getColor());  // ✅ color 값 확인 로그 추가
        
        // ✅ category 값이 없으면 기본값 'P' (내 일정) 설정
        if (calendar.getCategory() == null) {
            calendar.setCategory("P");
        }
        if (calendar.getStartDate() == null) {
            log.error("🚨 ERROR: startDate 값이 NULL 입니다!");
            return ResponseEntity.badRequest().body("startDate 값이 필요합니다.");
        } else {
            log.info("✅ startDate 값이 정상적으로 전달됨: {}", calendar.getStartDate());
        }

        // ✅ color 값이 없으면 기본값 설정 (예방 조치)
        if (calendar.getColor() == null || calendar.getColor().isEmpty()) {
            log.error("🚨 ERROR: color 값이 NULL 입니다! 클라이언트에서 값이 정상적으로 전달되지 않았습니다.");
            calendar.setColor("#000000"); // 기본 색상 설정
        }

        calendarService.addEvent(calendar);
        return ResponseEntity.ok("일정이 추가되었습니다.");
    }


    // ✅ 3. 일정 수정
    @PutMapping("/schedule/update/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable("id") int calNo, @RequestBody Calendar calendar) {
        log.debug("PUT /schedule/update/{} - event: {}", calNo, calendar);
        calendarService.updateEvent(calNo, calendar);
        return ResponseEntity.ok("일정이 수정되었습니다.");
    }

    // ✅ 4. 일정 삭제
    @DeleteMapping("/schedule/delete/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") int calNo) {
        log.debug("DELETE /schedule/delete/{} - event", calNo);
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
    @PostMapping("/meeting/add")
    public ResponseEntity<String> addMeetingReservation(@RequestBody MeetingReservation meeting) {
        log.debug("POST /meeting/add - meeting: {}", meeting);
        calendarService.addMeetingReservation(meeting);
        return ResponseEntity.ok("회의실 예약이 추가되었습니다.");
    }

    // ✅ 7. 회의실 예약 수정
    @PutMapping("/meeting/update/{id}")
    public ResponseEntity<String> updateMeetingReservation(
            @PathVariable("id") int mrResNo, @RequestBody MeetingReservation meeting) {
        log.debug("PUT /meeting/update/{} - meeting: {}", mrResNo, meeting);
        calendarService.updateMeetingReservation(mrResNo, meeting);
        return ResponseEntity.ok("회의실 예약이 수정되었습니다.");
    }

    // ✅ 8. 회의실 예약 삭제
    @DeleteMapping("/meeting/delete/{id}")
    public ResponseEntity<String> deleteMeetingReservation(@PathVariable("id") int mrResNo) {
        log.debug("DELETE /meeting/delete/{} - meeting", mrResNo);
        calendarService.deleteMeetingReservation(mrResNo);
        return ResponseEntity.ok("회의실 예약이 삭제되었습니다.");
    }

    // ✅ 9. 메모 조회
    @GetMapping("/memo/{userNo}")
    public ResponseEntity<CalendarMemo> getMemo(@PathVariable("userNo") int userNo) {
        log.debug("GET /memo/{}", userNo);
        return ResponseEntity.ok(calendarService.getMemo(userNo));
    }

    // ✅ 10. 메모 저장
    @PostMapping("/memo/add")
    public ResponseEntity<String> saveMemo(@RequestBody CalendarMemo memo) {
        log.debug("POST /memo/add - memo: {}", memo);
        calendarService.saveMemo(memo);
        return ResponseEntity.ok("메모가 저장되었습니다.");
    }

    // ✅ 11. 메모 수정
    @PutMapping("/memo/update/{userNo}")
    public ResponseEntity<String> updateMemo(@PathVariable("userNo") int userNo, @RequestBody CalendarMemo memo) {
        log.debug("PUT /memo/update/{} - memo: {}", userNo, memo);
        calendarService.updateMemo(userNo, memo);
        return ResponseEntity.ok("메모가 수정되었습니다.");
    }
}
