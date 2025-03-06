package com.workly.final_project.organization.model.dao;

import java.util.List;
import java.util.Map;

import com.workly.final_project.member.model.vo.Position;
import com.workly.final_project.organization.model.vo.Department;

public interface OrganizationDao {
    List<Department> selectAllDepartments();

    // (중요) List<Map<String, Object>>로 변경
    List<Map<String, Object>> selectAllMembers();

    List<Position> selectAllPositions();
}

