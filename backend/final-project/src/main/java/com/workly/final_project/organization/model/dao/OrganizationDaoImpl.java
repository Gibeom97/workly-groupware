package com.workly.final_project.organization.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.workly.final_project.member.model.vo.Position;
import com.workly.final_project.organization.model.vo.Department;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class OrganizationDaoImpl implements OrganizationDao {

    private final SqlSession sqlSession;

    @Override
    public List<Department> selectAllDepartments() {
        return sqlSession.selectList("organizationMapper.selectAllDepartments");
    }

    // (중요) selectAllMembers()도 List<Map<String,Object>> 반환
    @Override
    public List<Map<String, Object>> selectAllMembers() {
        return sqlSession.selectList("organizationMapper.selectAllMembers");
    }

    @Override
    public List<Position> selectAllPositions() {
        return sqlSession.selectList("organizationMapper.selectAllPositions");
    }
}

