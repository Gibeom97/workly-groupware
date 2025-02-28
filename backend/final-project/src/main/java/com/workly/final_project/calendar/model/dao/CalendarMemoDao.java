package com.workly.final_project.calendar.model.dao;
import com.workly.final_project.calendar.model.vo.CalendarMemo;
public interface CalendarMemoDao {
    CalendarMemo selectMemo(int userNo);
    int insertMemo(CalendarMemo memo);
    int updateMemo(CalendarMemo memo);
}