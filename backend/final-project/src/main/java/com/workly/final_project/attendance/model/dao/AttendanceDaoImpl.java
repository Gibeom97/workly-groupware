package com.workly.final_project.attendance.model.dao;

import java.util.Date;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AttendanceDaoImpl implements AttendanceDao {
	
	private final SqlSession session;

	@Override
	public int countAttendance(int userNo) {
		return session.selectOne("attendance.countAttendance", userNo);
	}
	
	@Override
	public int insertAttendance(int userNo) {
		return session.insert("attendance.insertAttendance", userNo);
	}
	
	@Override
	public int countAttendance2(int userNo) {
		return session.selectOne("attendance.countAttendance2", userNo);
	}

	@Override
	public int updateAttendance(int userNo) {
		return session.update("attendance.updateAttendance", userNo);
	}

	@Override
	public Date selectWorkOn(int userNo) {
		return session.selectOne("attendance.selectWorkOn", userNo);
	}

	@Override
	public Date selectWorkOff(int userNo) {
		return session.selectOne("attendance.selectWorkOff", userNo);
	}
}
