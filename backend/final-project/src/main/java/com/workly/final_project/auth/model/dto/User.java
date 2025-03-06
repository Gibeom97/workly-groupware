package com.workly.final_project.auth.model.dto;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class User extends UserDTO implements UserDetails {

	private List<SimpleGrantedAuthority> authorities; 
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {  // security가 내부적으로 이용하는 권한 가져오기 함수
		return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
	}

	@Override
	public String getPassword() {
		return getUserPwd();
	}

	@Override
	public String getUsername() {
		return String.valueOf(getUserNo());
	}
}