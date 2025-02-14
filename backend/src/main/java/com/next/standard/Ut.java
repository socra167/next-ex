package com.next.standard;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class Ut {
	public static class Json {
		private static final ObjectMapper objectMapper = new ObjectMapper();

		public static String toString(Object obj) {
			try{
				return objectMapper.writeValueAsString(obj);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}
	}

	public static class Jwt {

		public static String createToken(String keyString, int expireSeconds, Map<String, Object> claims) {
			Key secretKey = Keys.hmacShaKeyFor(keyString.getBytes());
			Date issuedAt = new Date();
			Date expiration = new Date(issuedAt.getTime() + 1000L * expireSeconds);

			// JWT를 생성(공식문서 참고)
			return Jwts.builder()
				.claims(claims)
				.issuedAt(issuedAt)
				.expiration(expiration)
				.signWith(secretKey)
				.compact();
		}

		public static boolean isValidToken(String keyString, String token) {
			SecretKey secretKey = Keys.hmacShaKeyFor(keyString.getBytes());
			try {
				Jwts
					.parser()
					.verifyWith(secretKey)
					.build()
					.parse(token);
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}

		public static Map<String, Object> getPayload(String keyString, String jwtStr) {
			SecretKey secretKey = Keys.hmacShaKeyFor(keyString.getBytes());
			return (Map<String, Object>) Jwts
				.parser()
				.verifyWith(secretKey)
				.build()
				.parse(jwtStr)
				.getPayload();
		}
	}
}
