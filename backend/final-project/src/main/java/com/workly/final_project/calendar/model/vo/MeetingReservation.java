package com.workly.final_project.calendar.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingReservation {
    private int mrResNo;      // 회의실 예약 번호 (PK)
    private int mrNo;         // 회의실 번호 (FK)
    private int userNo;       // 예약한 사용자 번호 (FK)
    private String mrResTitle; // 회의 제목
    private Date startTime;   // 예약 시작 시간
    private Date endTime;     // 예약 종료 시간
    private String reason;    // 예약 사유
    private String mrStatus;  // 회의실 예약 상태 (NULL 가능)
    private Date mrResDate;   // 회의 날짜
}
