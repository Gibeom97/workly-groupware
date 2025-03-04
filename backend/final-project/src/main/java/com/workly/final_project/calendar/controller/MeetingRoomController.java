package com.workly.final_project.calendar.controller;

import com.workly.final_project.calendar.model.service.MeetingRoomService;
import com.workly.final_project.calendar.model.vo.MeetingRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class MeetingRoomController {

    private final MeetingRoomService meetingRoomService;

    // 전체 회의실 목록 조회: 예) /meeting-rooms
    @GetMapping("/meeting-rooms")
    public ResponseEntity<List<MeetingRoom>> getAllMeetingRooms() {
        log.debug("📌 [GET] 모든 회의실 목록 조회 요청");
        return ResponseEntity.ok(meetingRoomService.getAllMeetingRooms());
    }

    // 특정 회의실 조회: 예) /meeting-rooms/{mrNo}
    @GetMapping("/meeting-rooms/{mrNo}")
    public ResponseEntity<MeetingRoom> getMeetingRoomById(@PathVariable int mrNo) {
        log.debug("📌 [GET] 특정 회의실({}) 정보 조회", mrNo);
        MeetingRoom meetingRoom = meetingRoomService.getMeetingRoomById(mrNo);
        if (meetingRoom == null) {
            log.error("🚨 [ERROR] 회의실 ID {}에 대한 데이터가 없음", mrNo);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meetingRoom);
    }
}

