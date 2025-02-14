package com.workly.final_project.common.controller;

import org.springframework.stereotype.Controller;

import com.workly.final_project.common.model.service.PaginationService;
import com.workly.final_project.common.model.vo.PageInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class PaginationController {
	
	private final PaginationService service;
	
	public PageInfo pagination(int cPage) {
		int currentPage = cPage; // 1. 클라이언트 요청 페이지
		int listCount = service.selectList(); // 2. 컨텐츠 총 갯수
		int pageLimit = 5; // 3. 페이징바 5페이지
		int contentsLimit = 2; // 4. 한 페이지당 컨텐츠 수 10개
		
		int maxPage = (int)Math.ceil((double)listCount / contentsLimit); // 5. 마지막 페이지 수 
		int startPage = ((currentPage - 1) / pageLimit) * pageLimit + 1; // 6. 처음 페이지 수
		int endPage = startPage + pageLimit - 1; // 7.  페이지 끝 수
		
		if(endPage > maxPage) { 
			endPage = maxPage;
		}
		
		PageInfo pi = new PageInfo(listCount, currentPage, pageLimit, contentsLimit, startPage, endPage, maxPage);
		
		return pi;
	}
}
