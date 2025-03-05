package com.workly.final_project.calendar.model.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.workly.final_project.calendar.model.vo.MeetingReservation;

public interface MeetingReservationDao {

    // ✅ 모든 회의실 예약 조회
    List<MeetingReservation> getAllReservations();

    // ✅ 특정 유저의 회의실 예약 조회
    List<MeetingReservation> getReservationsByUser(int userNo);

    // ✅ 특정 회의실의 예약 목록 조회
    List<MeetingReservation> getReservationsByRoom(int mrNo);

    // ✅ 회의실 예약 추가
    int insertReservation(MeetingReservation reservation);

    // ✅ 회의실 예약 수정
    int updateReservation(MeetingReservation reservation);

    // ✅ 회의실 예약 삭제
    int deleteReservation(int mrResNo);
    
    // ✅겹치는 예약을 조회
    List<MeetingReservation> getOverlappingReservations(@Param("mrNo") int mrNo,
											            @Param("startTime") Date startTime,
											            @Param("endTime") Date endTime);

}
