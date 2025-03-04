package com.workly.final_project.calendar.controller;

import com.workly.final_project.calendar.model.service.MeetingReservationService;
import com.workly.final_project.calendar.model.vo.MeetingReservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class MeetingReservationController {

    private final MeetingReservationService meetingReservationService;

    // 전체 조회: 예) /meeting-reservation
    @GetMapping("/meeting-reservation")
    public ResponseEntity<List<MeetingReservation>> getAllReservations() {
        log.debug("📌 [GET] 모든 회의실 예약 조회");
        return ResponseEntity.ok(meetingReservationService.getAllReservations());
    }

    // 특정 유저의 예약 조회: 예) /meeting-reservation/user/{userNo}
    @GetMapping("/meeting-reservation/user/{userNo}")
    public ResponseEntity<List<MeetingReservation>> getReservationsByUser(@PathVariable int userNo) {
        log.debug("📌 [GET] 특정 유저({})의 회의실 예약 조회", userNo);
        return ResponseEntity.ok(meetingReservationService.getReservationsByUser(userNo));
    }

    // 특정 회의실의 예약 목록 조회: 예) /meeting-reservation/room/{mrNo}
    @GetMapping("/meeting-reservation/room/{mrNo}")
    public ResponseEntity<List<MeetingReservation>> getReservationsByRoom(@PathVariable int mrNo) {
        log.debug("📌 [GET] 특정 회의실({})의 예약 목록 조회", mrNo);
        return ResponseEntity.ok(meetingReservationService.getReservationsByRoom(mrNo));
    }

    // 예약 추가: 예) /meeting-reservation/add
    @PostMapping("/meeting-reservation/add")
    public ResponseEntity<String> insertReservation(@RequestBody MeetingReservation reservation) {
        log.debug("📌 [POST] 새로운 예약 추가: {}", reservation);
        meetingReservationService.insertReservation(reservation);
        return ResponseEntity.ok("회의실 예약이 추가되었습니다.");
    }

    // 예약 수정: 예) /meeting-reservation/update/{id}
    @PutMapping("/meeting-reservation/update/{id}")
    public ResponseEntity<String> updateReservation(@PathVariable int id, @RequestBody MeetingReservation reservation) {
        log.debug("📌 [PUT] 예약 수정 (ID: {}): {}", id, reservation);
        meetingReservationService.updateReservation(id, reservation);
        return ResponseEntity.ok("회의실 예약이 수정되었습니다.");
    }

    // 예약 삭제: 예) /meeting-reservation/delete/{id}
    @DeleteMapping("/meeting-reservation/delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable int id) {
        log.debug("📌 [DELETE] 예약 삭제 (ID: {})", id);
        meetingReservationService.deleteReservation(id);
        return ResponseEntity.ok("회의실 예약이 삭제되었습니다.");
    }

    // IllegalArgumentException 예외 처리
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        // 클라이언트에게 400 BAD_REQUEST 상태 코드와 예외 메시지를 전달합니다.
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
