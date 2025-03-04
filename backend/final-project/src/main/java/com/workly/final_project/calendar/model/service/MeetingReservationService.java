package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.vo.MeetingReservation;
import java.util.List;

public interface MeetingReservationService {

    // ✅ 모든 회의실 예약 조회
    List<MeetingReservation> getAllReservations();

    // ✅ 특정 유저의 회의실 예약 조회
    List<MeetingReservation> getReservationsByUser(int userNo);

    // ✅ 특정 회의실의 예약 목록 조회
    List<MeetingReservation> getReservationsByRoom(int mrNo);

    // ✅ 회의실 예약 추가
    void insertReservation(MeetingReservation reservation);

    // ✅ 회의실 예약 수정
    void updateReservation(int id, MeetingReservation reservation);

    // ✅ 회의실 예약 삭제
    void deleteReservation(int mrResNo);
}
