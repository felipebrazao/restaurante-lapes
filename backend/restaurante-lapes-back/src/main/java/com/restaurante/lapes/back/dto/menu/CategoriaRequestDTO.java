package com.restaurante.lapes.back.dto.menu;

import jakarta.validation.constraints.NotBlank;

public record CategoriaRequestDTO(
		@NotBlank(message = "O nome é obrigatório")
		String nome,
		String descricao) {
}
