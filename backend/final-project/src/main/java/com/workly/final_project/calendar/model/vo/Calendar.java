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
public class Calendar {
    private int calNo;          // 일정 번호 (PK)
    private String category;    // 일정 카테고리 (내 일정, 팀 일정, 회의실 예약 등)
    private String title;       // 일정 제목
    private String content;     // 일정 내용
    private Date startDate;     // 시작 날짜
    private Date endDate;       // 종료 날짜
    private String color;       // 일정 색상
    private int userNo;         // 사용자 번호 (FK)
    private Integer deptNo;     // 부서 번호 (FK, 팀 일정에 필요) - 선택적
    private Integer mrResNo;    // 회의실 예약 번호 (FK, 회의실 일정에 필요) - 선택적
}
