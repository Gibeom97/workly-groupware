package com.workly.final_project.attendance.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AttendanceController {

	@GetMapping("/attendance")
	public String salary(Model model) {
		return "attendance";
	}
}
