package com.workly.final_project.attendance.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import com.workly.final_project.attendance.dto.AttendanceDTO;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AttendanceService {

    public void createAndSaveExcel(List<AttendanceDTO> attendanceList) throws Exception {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("근무기록");
            
            // 스타일 설정
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            
            // 헤더 생성
            String[] headers = {"성명", "팀명", "사번", "일자", "근무 부재", "출근 시간", "퇴근 시간", "초과 근무 시간", "특이 사항"};
            createRow(sheet, 0, headers, headerStyle);
            
            // 데이터 입력
            int rowNum = 1;
            for (AttendanceDTO attendance : attendanceList) {
                createRow(sheet, rowNum++, new String[]{
                    attendance.getEmployeeName(),
                    attendance.getTeamName(),
                    attendance.getEmployeeId(),
                    attendance.getDate(),
                    attendance.getAbsence(),
                    attendance.getStartTime(),
                    attendance.getEndTime(),
                    attendance.getOvertimeHours(),
                    attendance.getNote()
                });
            }
            
            // 열 너비 자동 조정
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            // 저장 경로 생성
            String directoryPath = "C:/attendance/";
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            
            // 파일 저장
            String fileName = "근무기록_" + 
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".xlsx";
            String filePath = directoryPath + fileName;
            
            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
                workbook.write(fileOut);
            }
        }
    }
    
    private void createRow(Sheet sheet, int rowNum, String[] values, CellStyle style) {
        Row row = sheet.createRow(rowNum);
        for (int i = 0; i < values.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(values[i]);
            if (style != null) {
                cell.setCellStyle(style);
            }
        }
    }
    
    private void createRow(Sheet sheet, int rowNum, String[] values) {
        createRow(sheet, rowNum, values, null);
    }
} 