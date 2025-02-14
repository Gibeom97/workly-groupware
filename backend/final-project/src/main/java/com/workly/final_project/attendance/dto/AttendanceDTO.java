package com.workly.final_project.attendance.dto;

import lombok.Data;

@Data
public class AttendanceDTO {
    private String employeeName;    // 성명
    private String teamName;        // 팀명
    private String employeeId;      // 사번
    private String date;            // 일자
    private String absence;         // 근무 부재
    private String startTime;       // 출근 시간
    private String endTime;         // 퇴근 시간
    private String overtimeHours;   // 초과 근무 시간
    private String note;            // 특이 사항
} 