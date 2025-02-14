package com.workly.final_project.leave.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LeaveController {


	@GetMapping("/leave")
	public String salary(Model model) {
		return "leave";
	}
}
