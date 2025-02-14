package com.workly.final_project.common.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class PaginationDaoImpl implements PaginationDao {

	private final SqlSession session;
	
	@Override
	public int selectList() {
		return session.selectOne("pagination.selectMemberList");
	}
	
}
