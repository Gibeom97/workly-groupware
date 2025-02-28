package com.workly.final_project.calendar.model.service;

import com.workly.final_project.calendar.model.dto.CalendarMemoDTO;

public interface CalendarMemoService {
    CalendarMemoDTO getMemo(int userNo);
    void saveMemo(CalendarMemoDTO memoDTO);
    void updateMemo(int userNo, CalendarMemoDTO memoDTO);
}
