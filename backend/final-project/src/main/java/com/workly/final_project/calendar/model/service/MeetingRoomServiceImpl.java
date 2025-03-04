package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.dao.MeetingRoomDao;
import com.workly.final_project.calendar.model.vo.MeetingRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingRoomServiceImpl implements MeetingRoomService {

    private final MeetingRoomDao meetingRoomDao;

    // ✅ 모든 회의실 목록 조회 (DTO 제거, VO 반환)
    @Override
    public List<MeetingRoom> getAllMeetingRooms() {
        return meetingRoomDao.getAllMeetingRooms();
    }

    // ✅ 특정 회의실 정보 조회 (DTO 제거, VO 반환)
    @Override
    public MeetingRoom getMeetingRoomById(int mrNo) {
        return meetingRoomDao.getMeetingRoomById(mrNo);
    }
}
