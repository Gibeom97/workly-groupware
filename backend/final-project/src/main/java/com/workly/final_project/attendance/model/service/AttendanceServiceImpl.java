package com.workly.final_project.attendance.model.service;

import org.springframework.stereotype.Service;

import com.workly.final_project.attendance.model.dao.AttendanceDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {
	
	private final AttendanceDao dao;
	
	@Override
	public int insertAttendance(int userNo) {
		int result = dao.countAttendance(userNo);
		
		if(result > 0) {
			return 0;
		}
		
		return dao.insertAttendance(userNo);
	}

	@Override
	public int updateAttendance(int userNo) {
		int result = dao.countAttendance(userNo);
		
		if(result == 0) {
			return 0;
		}
		
		result = dao.countAttendance2(userNo);
		
		if(result > 0) { 
			return 0; 
		}
		
		return dao.updateAttendance(userNo);
		
	}
}
