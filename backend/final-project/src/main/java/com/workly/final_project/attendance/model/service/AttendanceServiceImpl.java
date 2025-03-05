package com.workly.final_project.attendance.model.service;

<<<<<<< HEAD
import java.util.Date;

=======
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
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
<<<<<<< HEAD
		int result = dao.countAttendance(userNo); 
		if(result == 0) { 
			return 2; // 금일 출근 내역이 없습니다. 2번 오류
		}
		
		result = dao.countAttendance2(userNo);   
		if(result > 0) { 
			return 3;  // 이미 퇴근 처리되었습니다. 3번 오류
=======
		int result = dao.countAttendance(userNo);
		
		if(result == 0) {
			return 0;
		}
		
		result = dao.countAttendance2(userNo);
		
		if(result > 0) { 
			return 0; 
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
		}
		
		return dao.updateAttendance(userNo);
		
	}
<<<<<<< HEAD

	@Override
	public Date selectWorkOn(int userNo) {
		return dao.selectWorkOn(userNo);
	}

	@Override
	public Date selectWorkOff(int userNo) {
		return dao.selectWorkOff(userNo);
	}
=======
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
}
