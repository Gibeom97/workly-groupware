package com.workly.final_project.attendance.model.dao;

<<<<<<< HEAD
import java.util.Date;

=======
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
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

<<<<<<< HEAD
	@Override
	public Date selectWorkOn(int userNo) {
		return session.selectOne("attendance.selectWorkOn", userNo);
	}

	@Override
	public Date selectWorkOff(int userNo) {
		return session.selectOne("attendance.selectWorkOff", userNo);
	}
=======


	
>>>>>>> b991b03 ((팀원) 출퇴근 기록 커밋 3.5(수))
}
