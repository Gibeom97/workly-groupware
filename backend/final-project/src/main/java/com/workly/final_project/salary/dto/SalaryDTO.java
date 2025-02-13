package com.workly.final_project.salary.dto;

import lombok.Data;

@Data
public class SalaryDTO {
    private String employeeName;
    private String employeeId;
    private String department;
    private String position;
    private String baseSalary;
    private String overtimeHours;
    private String bonus;
} 