package com.workly.final_project.organization.model.service;

import java.util.List;
import java.util.Map;
import com.workly.final_project.organization.model.vo.Department;

public interface OrganizationService {
    // 기존 조직도 트리 반환 (Department VO)
    List<Department> getOrganizationChart();

    // 새 메서드: 각 부서의 구성원 정보를 Map<String,Object>로 변환하여 반환
    List<Map<String, Object>> getOrganizationChartMap();
}
