package com.workly.final_project.calendar.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workly.final_project.calendar.model.dao.CalendarMemoDao;
import com.workly.final_project.calendar.model.dto.CalendarMemoDTO;
import com.workly.final_project.calendar.model.vo.CalendarMemo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CalendarMemoServiceImpl implements CalendarMemoService {
    private final CalendarMemoDao calendarMemoDao;

    @Override
    public CalendarMemoDTO getMemo(int userNo) {
        System.out.println("🛠 getMemo 실행됨! userNo: " + userNo);
        CalendarMemo memo = calendarMemoDao.selectMemo(userNo);

        if (memo == null) {
            System.out.println("🚨 getMemo 결과: NULL (해당 userNo에 대한 메모 없음)");
            return null;
        }

        System.out.println("✅ getMemo 결과: " + memo);
        return new CalendarMemoDTO(memo.getUserNo(), memo.getMemo()); // memoNo 제거
    }


    @Transactional
    @Override
    public void saveMemo(CalendarMemoDTO memoDTO) {
        System.out.println("🛠 saveMemo 실행됨! userNo: " + memoDTO.getUserNo() + ", memo: " + memoDTO.getMemo());

        CalendarMemo memo = CalendarMemo.builder()
            .userNo(memoDTO.getUserNo())
            .memo(memoDTO.getMemo())
            .build();

        int result = calendarMemoDao.insertMemo(memo);

        if (result > 0) {
            System.out.println("✅ saveMemo 성공! COMMIT 실행됨");
        } else {
            System.err.println("🚨 saveMemo 실패! ROLLBACK 발생");
        }
    }


    @Transactional
    @Override
    public void updateMemo(int userNo, CalendarMemoDTO memoDTO) {
        CalendarMemo memo = CalendarMemo.builder()
            .userNo(userNo)
            .memo(memoDTO.getMemo())
            .build();
        
        int result = calendarMemoDao.updateMemo(memo);
        
        if (result > 0) {
            System.out.println("✅ 메모 수정 성공!");
        } else {
            System.err.println("🚨 메모 수정 실패! 트랜잭션이 롤백됩니다.");
        }
    }

}
