package com.workly.final_project.attendance.model.dao;

import java.util.Date;

public interface AttendanceDao {

	int insertAttendance(int userNo);

	int countAttendance(int userNo);

	int updateAttendance(int userNo);

	int countAttendance2(int userNo);

	Date selectWorkOn(int userNo);

	Date selectWorkOff(int userNo);
}
