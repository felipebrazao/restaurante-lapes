package com.restaurante.lapes.back.dto;

public record LoginResponseDTO(
		String acessToken,
		String refreshToken,
		UsuarioResponseDTO usuario) {
}
