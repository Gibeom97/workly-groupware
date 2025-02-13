package com.workly.final_project.salary.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.workly.final_project.salary.dto.SalaryDTO;

import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class SalaryService {

    public void createAndSaveExcel(SalaryDTO salaryDTO) throws Exception {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("급여대장");
            
            // 스타일 설정
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            
            // 데이터 입력
            createRow(sheet, 0, new String[]{"급 여 대 장", "2025 4대보험 요율 적용"}, headerStyle);
            createRow(sheet, 1, new String[]{"성명", salaryDTO.getEmployeeName(), "사번", salaryDTO.getEmployeeId()});
            createRow(sheet, 2, new String[]{"부서", salaryDTO.getDepartment(), "직급", salaryDTO.getPosition()});
            
            // 급여 계산
            int baseSalary = Integer.parseInt(salaryDTO.getBaseSalary());
            int overtimePay = Integer.parseInt(salaryDTO.getOvertimeHours()) * 12000 * 2;
            int bonus = Integer.parseInt(salaryDTO.getBonus());
            
            // 4대보험 계산
            int pension = (int)(baseSalary * 0.045);
            int healthInsurance = (int)(baseSalary * 0.0375);
            int employmentInsurance = (int)(baseSalary * 0.009);
            int longTermCare = (int)(healthInsurance * 0.115);
            
            // 합계 계산
            int totalPay = baseSalary + overtimePay + bonus;
            int totalDeduction = pension + healthInsurance + employmentInsurance + longTermCare;
            int netPay = totalPay - totalDeduction;
            
            // 급여 내역 입력
            createRow(sheet, 4, new String[]{"입금 항목", "지급 금액", "공제 항목", "공제 금액"}, headerStyle);
            createRow(sheet, 5, new String[]{"기본급", String.valueOf(baseSalary), "국민연금", String.valueOf(pension)});
            createRow(sheet, 6, new String[]{"초과근무수당", String.valueOf(overtimePay), "건강보험료", String.valueOf(healthInsurance)});
            createRow(sheet, 7, new String[]{"보너스", String.valueOf(bonus), "장기요양보험료", String.valueOf(longTermCare)});
            createRow(sheet, 8, new String[]{"", "", "고용보험료", String.valueOf(employmentInsurance)});
            createRow(sheet, 10, new String[]{"지급액 계", String.valueOf(totalPay), "공제액 계", String.valueOf(totalDeduction)});
            createRow(sheet, 11, new String[]{"실수령액", String.valueOf(netPay)});
            
            // 파일 저장
            String fileName = "급여대장_" + salaryDTO.getEmployeeId() + "_" + 
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".xlsx";
            String filePath = "C:/salary/" + fileName; // 저장 경로 설정
            
            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
                workbook.write(fileOut);
            }
        }
    }
    
    private void createRow(Sheet sheet, int rowNum, String[] values) {
        createRow(sheet, rowNum, values, null);
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
} 