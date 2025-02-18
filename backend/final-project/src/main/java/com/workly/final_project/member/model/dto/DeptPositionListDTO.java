package com.workly.final_project.member.model.dto;

import java.util.List;

import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Position;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeptPositionListDTO {
	private List<Department> department;
	private List<Position> position;
}
