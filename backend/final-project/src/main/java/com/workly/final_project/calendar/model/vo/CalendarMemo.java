package com.workly.final_project.calendar.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarMemo {
    private int memoNo;       // 메모 번호 (PK)
    private int userNo;       // 사용자 번호 (FK)
    private String content;   // 메모 내용
}
