package com.workly.final_project.common.model.service;

import org.springframework.stereotype.Service;

import com.workly.final_project.common.model.dao.PaginationDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaginationServiceImpl implements PaginationService{
	
	private final PaginationDao dao;
	
	@Override
	public int selectList() {
		return dao.selectList();
	}
}
