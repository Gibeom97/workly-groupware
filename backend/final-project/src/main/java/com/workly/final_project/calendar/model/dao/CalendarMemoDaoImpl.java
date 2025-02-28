package com.workly.final_project.calendar.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CalendarMemoDaoImpl implements CalendarMemoDao {
    private final SqlSession sqlSession;

    @Override
    public CalendarMemo selectMemo(int userNo) {
        System.out.println("🛠 selectMemo 실행됨! userNo: " + userNo);
        CalendarMemo memo = sqlSession.selectOne("calendarMemoMapper.selectMemo", userNo);
        System.out.println("🛠 selectMemo 실행 결과: " + memo);
        return memo;
    }


    @Override
    public int insertMemo(CalendarMemo memo) {
        System.out.println("🛠 insertMemo 실행됨! userNo: " + memo.getUserNo() + ", memo: " + memo.getMemo());
        int result = sqlSession.insert("calendarMemoMapper.insertMemo", memo);

        if (result > 0) {
            System.out.println("✅ insertMemo 성공! COMMIT 실행");
            sqlSession.commit();
        } else {
            System.err.println("🚨 insertMemo 실패! ROLLBACK 발생");
        }
        return result;
    }



    @Override
    public int updateMemo(CalendarMemo memo) {
        return sqlSession.update("calendarMemoMapper.updateMemo", memo);
    }

}
