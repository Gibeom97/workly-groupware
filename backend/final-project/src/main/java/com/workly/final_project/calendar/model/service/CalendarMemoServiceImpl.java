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
            System.out.println("🚨 getMemo 결과: NULL (해당 userNo에 대한 메모 없음, 기본값 '' 반환)");
            return CalendarMemoDTO.builder()
                .userNo(userNo)
                .memo("") // 🔥 기본값 빈 문자열 반환
                .build();
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

        // 1) 먼저 update 시도
        int result = calendarMemoDao.updateMemo(memo);

        // 2) update 대상이 없으면 (result == 0) insert 실행
        if (result == 0) {
            calendarMemoDao.insertMemo(memo);
        }
    }


}
