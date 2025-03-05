package com.workly.final_project.calendar.model.dao;

import com.workly.final_project.calendar.model.vo.MeetingRoom;

import java.util.List;

public interface MeetingRoomDao {

    // ✅ 모든 회의실 목록 조회
    List<MeetingRoom> getAllMeetingRooms();

    // ✅ 특정 회의실 정보 조회
    MeetingRoom getMeetingRoomById(int mrNo);
}
