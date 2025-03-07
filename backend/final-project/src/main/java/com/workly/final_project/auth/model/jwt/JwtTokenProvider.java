package com.workly.final_project.auth.model.jwt;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.workly.final_project.auth.model.dto.User;
import com.workly.final_project.auth.model.service.CustomUserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
	
	private final CustomUserDetailsService userDetailService;
	
	@Value("${jwt.secretkey}")
	private String secretKey;
	
	// secretkey Base64방식으로 암호화
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	
	public String createToken(User user) {
		String userNo = String.valueOf(user.getUserNo());
		Date now = new Date();
		String jwtToken = Jwts.builder()
							  .setClaims(Jwts.claims().setSubject(userNo)) // 유저 정보 저장(파싱하면 유저정보 얻어올 수 있음)
							  .setIssuedAt(now) //토큰 발급 시간(현재)
							  .setExpiration(new Date(now.getTime() + (30 * 60 * 1000))) // 현재 시간 기준 + 30분
							  .signWith(SignatureAlgorithm.HS256, secretKey)
							  .compact();
		
		System.out.println("tokenProvider, 생성한 jwtToken: " + jwtToken);
		
		return jwtToken;
	}

	// header에서 토큰을 추출하는 함수
	public String resolveToken(HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization");
		return accessToken;
	}

	// 토큰의 유효기간 확인
	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token); // jws = jwt 내부의 정보를 저장하는 객체
			System.out.println("tokenProvider, 받은 token의 claims 추출: " + claims);
			
			return !claims.getBody().getExpiration().before(new Date()); // 유효기간이 현재 시간보다 이전인지 확인 -> 유효하면 true 반환해야하므로 !연산자 필요
		} catch(Exception e) {
			return false;
		}
	}

	public Authentication getAuthentication(String token) {
		String userNo = getUserNo(token); // jwt에서 유저번호 추출하는 메서드
		User user = (User)userDetailService.loadUserByUsername(userNo);
		
		return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
	}

	private String getUserNo(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}
}