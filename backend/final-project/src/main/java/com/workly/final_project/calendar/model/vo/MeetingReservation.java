package com.workly.final_project.calendar.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingReservation {
    private int resNo;         // 회의실 예약 번호 (PK)
    private int roomNo;        // 회의실 번호 (FK)
    private int userNo;        // 예약한 사용자 번호 (FK)
    private Date startTime;    // 예약 시작 시간
    private Date endTime;      // 예약 종료 시간
    private String title;      // 예약 제목
    private String description; // 예약 설명
}
