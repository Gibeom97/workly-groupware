package com.workly.final_project.organization.model.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.workly.final_project.organization.model.dao.OrganizationDao;
import com.workly.final_project.organization.model.vo.Department;
import com.workly.final_project.member.model.vo.Position;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationDao organizationDao;

    @Override
    public List<Department> getOrganizationChart() {
        // 기존 트리 구성 로직 (사용하지 않으므로 빈 리스트 반환)
        return Collections.emptyList();
    }

    /**
     * flat(평면) 형태로 모든 부서를 반환,
     * 각 부서에는 Map<String,Object> 형태의 members(직급명, 프로필 이미지, 등등) 포함
     * children은 빈 배열로 설정.
     */
    @Override
    public List<Map<String, Object>> getOrganizationChartMap() {
        // 1) 부서, 사원(Map), 직급 정보를 각각 조회
        List<Department> allDepts = organizationDao.selectAllDepartments();
        List<Map<String, Object>> allMembersMap = organizationDao.selectAllMembers();
        List<Position> allPositions = organizationDao.selectAllPositions();

        log.debug("🔹 allDepts size: {}", allDepts.size());
        log.debug("🔹 allMembers size: {}", allMembersMap.size());
        log.debug("🔹 allPositions size: {}", allPositions.size());

        // 2) positionNo -> positionName 매핑
        Map<Integer, String> positionMap = allPositions.stream()
            .collect(Collectors.toMap(Position::getPositionNo, Position::getPositionName));

        // 3) deptNo -> List<Map<String,Object>> 그룹화
        Map<Integer, List<Map<String, Object>>> deptMembersMap = allMembersMap.stream()
            .collect(Collectors.groupingBy(m -> {
                // deptNo(또는 DEPTNO) 통일
                Object deptNoObj = m.get("deptNo");
                if (deptNoObj == null) {
                    deptNoObj = m.get("DEPTNO");
                }
                return ((Number) deptNoObj).intValue();
            }));

        List<Map<String, Object>> deptMaps = new ArrayList<>();

        for (Department dept : allDepts) {
            // 각 부서 정보를 담을 Map
            Map<String, Object> deptMap = new HashMap<>();
            deptMap.put("deptNo", dept.getDeptNo());
            deptMap.put("deptName", dept.getDeptName());
            deptMap.put("topDeptCode", dept.getTopDeptCode());
            deptMap.put("children", new ArrayList<>()); // flat 구조 → children는 빈 배열

            // 해당 부서에 속한 사원 목록 (Map 형태)
            List<Map<String, Object>> membersInDept = deptMembersMap.getOrDefault(dept.getDeptNo(), new ArrayList<>());

            // 각 사원(Map)에 필요한 필드를 통일
            List<Map<String, Object>> memberMaps = membersInDept.stream().map(m -> {

                // 1) userNo → 숫자로 변환
                Object userNoObj = m.get("userNo");
                if (userNoObj == null) {
                    userNoObj = m.get("USER_NO");
                }
                int userNo = 0;
                if (userNoObj instanceof Number) {
                    userNo = ((Number) userNoObj).intValue();
                } else if (userNoObj instanceof String) {
                    userNo = Integer.parseInt((String) userNoObj);
                }
                m.put("userNo", userNo);

                // 2) userName(대소문자 통일)
                String userName = (String) m.get("userName");
                if (userName == null) {
                    userName = (String) m.get("USER_NAME");
                    if (userName == null) {
                        userName = (String) m.get("USERNAME");
                    }
                }
                m.put("userName", userName);

                // 3) companyId → 숫자로 변환
                Object compIdObj = m.get("companyId");
                if (compIdObj == null) {
                    compIdObj = m.get("COMPANYID");
                }
                int compId = 0;
                if (compIdObj instanceof Number) {
                    compId = ((Number) compIdObj).intValue();
                } else if (compIdObj instanceof String) {
                    compId = Integer.parseInt((String) compIdObj);
                }
                m.put("companyId", compId);

                // 4) phone, extension, email → 문자열 통일
                // phone
                String phone = (String) m.get("phone");
                if (phone == null) {
                    phone = (String) m.get("PHONE");
                }
                m.put("phone", phone);

                // extension
                String extension = (String) m.get("extension");
                if (extension == null) {
                    extension = (String) m.get("EXTENSION");
                }
                m.put("extension", extension);

                // email
                String email = (String) m.get("email");
                if (email == null) {
                    email = (String) m.get("EMAIL");
                }
                m.put("email", email);

                // 5) positionNo → positionName
                Object posObj = m.get("positionNo");
                if (posObj == null) {
                    posObj = m.get("POSITIONNO");
                }
                int posNo = 0;
                if (posObj instanceof Number) {
                    posNo = ((Number) posObj).intValue();
                } else if (posObj instanceof String) {
                    posNo = Integer.parseInt((String) posObj);
                }
                String posName = positionMap.getOrDefault(posNo, "");
                m.put("positionName", posName);

                // 6) changeName + filePath → profileImage
                String changeName = (String) m.get("changeName");
                if (changeName == null) {
                    changeName = (String) m.get("CHANGENAME");
                }
                String filePath = (String) m.get("filePath");
                if (filePath == null) {
                    filePath = (String) m.get("FILEPATH");
                }
                String profileImage = null;
                if (changeName != null && filePath != null) {
                    profileImage = filePath + changeName;
                }
                m.put("profileImage", profileImage);

                return m;
            }).collect(Collectors.toList());

            deptMap.put("members", memberMaps);
            deptMaps.add(deptMap);
        }

        return deptMaps;
    }
}
