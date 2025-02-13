package com.workly.final_project.salary.controller;

import java.io.IOException;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaveSalaryController {
	@PostMapping("/saveExcel")
    public Map<String, String> saveExcel(@RequestBody Map<String, String> employeeData) {
        String filePath = "C:/salary_reports/" + employeeData.get("employeeName") + "_" + employeeData.get("employeeId") + ".xlsx";

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("급여대장");

            // 제목 행
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("급 여 대 장");
            headerRow.createCell(1).setCellValue("(2025 4대보험 요율 적용)");

            // 사원 정보
            Row row1 = sheet.createRow(2);
            row1.createCell(0).setCellValue("성명");
            row1.createCell(1).setCellValue(employeeData.get("employeeName"));
            row1.createCell(2).setCellValue("사번");
            row1.createCell(3).setCellValue(employeeData.get("employeeId"));

            Row row2 = sheet.createRow(3);
            row2.createCell(0).setCellValue("부서");
            row2.createCell(1).setCellValue(employeeData.get("department"));
            row2.createCell(2).setCellValue("직급");
            row2.createCell(3).setCellValue(employeeData.get("position"));

            // 급여 정보
            Row row3 = sheet.createRow(5);
            row3.createCell(0).setCellValue("입금 항목");
            row3.createCell(1).setCellValue("지급 금액");
            row3.createCell(2).setCellValue("공제 항목");
            row3.createCell(3).setCellValue("공제 금액");

            Row row4 = sheet.createRow(6);
            row4.createCell(0).setCellValue("기본급");
            row4.createCell(1).setCellValue(employeeData.get("baseSalary"));

            Row row5 = sheet.createRow(7);
            row5.createCell(0).setCellValue("초과근무수당");
            row5.createCell(1).setCellValue(Integer.parseInt(employeeData.get("overtimeHours")) * 12000 * 2);

            Row row6 = sheet.createRow(8);
            row6.createCell(0).setCellValue("보너스");
            row6.createCell(1).setCellValue(employeeData.get("bonus"));

            // 공제액 (자동 계산)
            int baseSalary = Integer.parseInt(employeeData.get("baseSalary"));
            int pension = (int) (baseSalary * 0.045); // 국민연금
            int healthInsurance = (int) (baseSalary * 0.0375); // 건강보험
            int employmentInsurance = (int) (baseSalary * 0.009); // 고용보험
            int longTermCare = (int) (healthInsurance * 0.115); // 장기요양보험
            int totalDeduction = pension + healthInsurance + employmentInsurance + longTermCare;

            Row row7 = sheet.createRow(9);
            row7.createCell(2).setCellValue("국민연금");
            row7.createCell(3).setCellValue(pension);

            Row row8 = sheet.createRow(10);
            row8.createCell(2).setCellValue("건강보험료");
            row8.createCell(3).setCellValue(healthInsurance);

            Row row9 = sheet.createRow(11);
            row9.createCell(2).setCellValue("장기요양보험료");
            row9.createCell(3).setCellValue(longTermCare);

            Row row10 = sheet.createRow(12);
            row10.createCell(2).setCellValue("고용보험료");
            row10.createCell(3).setCellValue(employmentInsurance);

            Row row11 = sheet.createRow(14);
            row11.createCell(0).setCellValue("초과근무시간");
            row11.createCell(1).setCellValue(employeeData.get("overtimeHours"));
            row11.createCell(2).setCellValue("공제액 계");
            row11.createCell(3).setCellValue(totalDeduction);

            int totalPay = baseSalary + Integer.parseInt(employeeData.get("bonus"));
            int netPay = totalPay - totalDeduction;

            Row row12 = sheet.createRow(15);
            row12.createCell(0).setCellValue("지급액 계");
            row12.createCell(1).setCellValue(totalPay);
            row12.createCell(2).setCellValue("실수령액");
            row12.createCell(3).setCellValue(netPay);

            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
                workbook.write(fileOut);
            }

            return Map.of("success", "true", "message", "파일이 성공적으로 저장되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
            return Map.of("success", "false", "message", "파일 저장 중 오류 발생");
        }
    }
}