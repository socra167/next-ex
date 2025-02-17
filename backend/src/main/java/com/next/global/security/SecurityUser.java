package com.next.global.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class SecurityUser extends User {
	private long id;
	private String nickname;

	public SecurityUser(long id, String username, String password, String nickname, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.id = id;
		this.nickname = nickname;
	}
}