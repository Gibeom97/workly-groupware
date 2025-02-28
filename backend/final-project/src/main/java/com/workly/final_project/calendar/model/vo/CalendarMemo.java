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
    private int userNo;     // FK (PK 역할)
    private String memo;    // 메모 내용
}
