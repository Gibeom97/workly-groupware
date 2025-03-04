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
public class MeetingRoom {
    private int mrNo; // 회의실 번호 (PK)
    private String mrName; // 회의실 이름
    private int capacity; // 최대 수용 인원
}

