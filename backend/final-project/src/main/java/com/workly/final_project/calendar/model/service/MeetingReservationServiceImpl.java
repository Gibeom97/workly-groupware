package com.workly.final_project.calendar.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.calendar.model.dao.MeetingReservationDao;
import com.workly.final_project.calendar.model.vo.MeetingReservation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MeetingReservationServiceImpl implements MeetingReservationService {

    private final MeetingReservationDao meetingReservationDao;

    @Override
    public List<MeetingReservation> getAllReservations() {
        return meetingReservationDao.getAllReservations();
    }

    @Transactional
    @Override
    public void insertReservation(MeetingReservation reservation) {
        // 새로운 예약의 시작과 종료 시간을 Date 타입으로 변환했다고 가정합니다.
        Date newStart = reservation.getStartTime();
        Date newEnd = reservation.getEndTime();
        
        // 같은 회의실(mrNo)에서 겹치는 예약 조회
        List<MeetingReservation> overlapping = meetingReservationDao.getOverlappingReservations(
                reservation.getMrNo(), newStart, newEnd);
        
        if (!overlapping.isEmpty()) {
            // 겹치는 예약이 있다면 예외를 던져 예약 추가를 중단합니다.
            throw new IllegalArgumentException("해당 시간대의 회의실은 이미 예약 되어있습니다.");
        }
        
        // 겹치는 예약이 없으면 예약 추가
        meetingReservationDao.insertReservation(reservation);
    }


    @Transactional
    @Override
    public void updateReservation(int id, MeetingReservation reservation) {
        log.debug("📌 회의실 예약 수정 요청 ID: {}, 데이터: {}", id, reservation);
        
        // 예약 수정 전, 중복 예약 여부 체크
        Date newStart = reservation.getStartTime();
        Date newEnd = reservation.getEndTime();

        // 현재 수정하려는 예약은 제외하고 중복 체크
        List<MeetingReservation> overlapping = meetingReservationDao.getOverlappingReservations(
            reservation.getMrNo(), newStart, newEnd
        );
        // 현재 예약을 수정하는 경우 자신의 예약은 중복 체크에서 제외
        overlapping.removeIf(r -> r.getMrResNo() == id);

        if (!overlapping.isEmpty()) {
            throw new IllegalArgumentException("해당 시간대의 회의실은 이미 예약 되어있습니다.");
        }

        reservation.setMrResNo(id);
        meetingReservationDao.updateReservation(reservation);
    }


    @Override
    public List<MeetingReservation> getReservationsByUser(int userNo) {
        return meetingReservationDao.getReservationsByUser(userNo);
    }

    @Override
    public List<MeetingReservation> getReservationsByRoom(int mrNo) {
        return meetingReservationDao.getReservationsByRoom(mrNo);
    }

    @Transactional
    @Override
    public void deleteReservation(int id) {
        log.debug("📌 회의실 예약 삭제 요청 ID: {}", id);
        meetingReservationDao.deleteReservation(id);
    }
}
