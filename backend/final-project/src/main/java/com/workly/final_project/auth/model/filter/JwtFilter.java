package com.workly.final_project.auth.model.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.workly.final_project.auth.model.jwt.JwtTokenProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

	private final JwtTokenProvider provider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("필터가 실행됨");
		
		// 클라이언트의 요청 데이터 중 Header에 있는 access토큰을 추출하여 Authentication 객체를 생성해주는 함수를 추가
		String token = provider.resolveToken((HttpServletRequest)request);
		System.out.println("필터에서 토큰 추출: " + token);
		
		// 토큰의 유효성 검사가 필요(복호화 가능한지, 유효시간이 남아있는 토큰인지) -> 유효하면 Authentication 객체를 SecurityContext에 저장
		if(token != null && provider.validateToken(token)) { // 유효시간 검사 메서드
			Authentication auth = provider.getAuthentication(token); // 토큰 추가 메서드
			SecurityContextHolder.getContext().setAuthentication(auth);
			System.out.println("필터에서 jwt 인증 성공");
		}
		
		System.out.println("필터에서 securitContextHolder내부 인증정보: " + SecurityContextHolder.getContext().getAuthentication());
		chain.doFilter(request, response); // 다음 체인으로 넘어갈 수 있도록 doFilter실행
	}
}
