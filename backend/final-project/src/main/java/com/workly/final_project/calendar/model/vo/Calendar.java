package com.workly.final_project.calendar.model.vo;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Calendar {
    private int calNo;
    private String category;
    private String title;
    private String content = ""; // 기본값을 빈 문자열로 설정

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate = LocalDate.now();  // 기본값 추가 (예방 조치)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Integer userNo;  // ✅ Integer 타입 변경
    private Integer deptNo;
    private Integer mrResNo;
    private String color = "#000000";  // ✅ 기본값 설정 (예방 조치)

}
