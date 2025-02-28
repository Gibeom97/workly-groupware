package com.workly.final_project.calendar.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarMemoDTO {
    private int userNo;     // 사용자 번호 (FK)
    private String memo;    // 메모 내용
}
