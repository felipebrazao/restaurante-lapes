package com.restaurante.lapes.back.dto;

import com.restaurante.lapes.back.enums.Role;

public record UsuarioResponseDTO(
		Long id,
		String nome,
		String email,
		Role role) {
}
