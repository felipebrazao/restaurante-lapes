package com.restaurante.lapes.back.service;


import java.util.Date;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
@Service
public class JwtService {

	private static final long EXPIRACAO_TOKEN = 100 * 60 * 60 * 10;
	private static final long EXPIRACAO_REFRESH  = 1000L * 60 * 60 * 24 * 7;
	private static final String SECRET_KEY = "super-chave-muito-secreta-e-grande-123456789!";
	
	private final Algorithm algorith = Algorithm.HMAC256(SECRET_KEY);
	
	public String gerarAccessToken(String email) {
		return JWT.create()
				.withSubject(email)
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRACAO_TOKEN))
				.sign(algorith);
	}
	public String gerarRefreshToken(String email) {
		return JWT.create()
				.withSubject(email)
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRACAO_REFRESH))
				.sign(algorith);
	}
	
	public String validarToken(String token) {
		try {
			JWTVerifier verifier = JWT.require(algorith).build();
			DecodedJWT decoded = verifier.verify(token);
			return decoded.getSubject();
		} catch (JWTVerificationException e) {
			return null;
		}
	}
	
	public boolean tokenValido (String token) {
		return validarToken(token) != null;
	}
}
