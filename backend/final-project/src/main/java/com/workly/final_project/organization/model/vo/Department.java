package com.workly.final_project.organization.model.vo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;
import com.workly.final_project.member.model.vo.Member;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Alias("OrganizationDepartment")
public class Department {
    private int deptNo;
    private String deptName;
    private String topDeptCode;
    private List<Member> members;      // 해당 부서에 속한 구성원 목록
    private List<Department> children; // 하위 부서 목록
}
