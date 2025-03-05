package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.vo.MeetingRoom;
import java.util.List;

public interface MeetingRoomService {

    // ✅ 모든 회의실 목록 조회 (DTO → VO 변경)
    List<MeetingRoom> getAllMeetingRooms();

    // ✅ 특정 회의실 정보 조회 (DTO → VO 변경)
    MeetingRoom getMeetingRoomById(int mrNo);
}
