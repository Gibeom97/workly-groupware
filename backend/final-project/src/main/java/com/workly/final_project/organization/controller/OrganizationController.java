package com.workly.final_project.organization.controller;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.workly.final_project.organization.model.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/organization")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class OrganizationController {

    private final OrganizationService organizationService;

    /**
     * 기존 조직도 트리 (Department VO) 반환 엔드포인트
     */
    @GetMapping
    public ResponseEntity<List<?>> getOrganizationChart() {
        log.info("🔸 GET /organization - 전체 조직도 조회");
        List<?> orgChart = organizationService.getOrganizationChart();
        return ResponseEntity.ok(orgChart);
    }

    /**
     * 새 엔드포인트: 각 부서의 구성원 정보를 Map<String,Object> 형태로 변환하여 반환  
     * (Member.java 수정 없이, Service에서 MEMBER와 POSITION을 개별 조회 후 매핑)
     */
    @GetMapping("/map")
    public ResponseEntity<List<Map<String, Object>>> getOrganizationChartMap() {
        log.info("🔸 GET /organization/map - 조직도(직급명, 프로필 이미지 포함) 조회");
        List<Map<String, Object>> orgChartMap = organizationService.getOrganizationChartMap();
        return ResponseEntity.ok(orgChartMap);
    }
}
