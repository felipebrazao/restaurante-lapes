package com.restaurante.lapes.back.dto;

import com.restaurante.lapes.back.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDTO(
		@NotBlank String nome,
		@Email @NotBlank String email,
		@NotBlank String senha) {
}
