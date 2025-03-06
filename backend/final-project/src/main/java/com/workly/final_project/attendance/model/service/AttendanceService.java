package com.workly.final_project.attendance.model.service;

import java.util.Date;

public interface AttendanceService {

	int insertAttendance(int userNo);

	int updateAttendance(int userNo);

	Date selectWorkOn(int userNo);

	Date selectWorkOff(int userNo);
}
