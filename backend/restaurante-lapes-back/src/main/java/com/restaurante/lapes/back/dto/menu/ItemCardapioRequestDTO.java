package com.restaurante.lapes.back.dto.menu;

import java.util.List;

import jakarta.validation.constraints.Min;

public record ItemCardapioRequestDTO(
    String nome,
    String descricao,
    @Min(value = 0, message = "O preço não pode ser negativo") Integer precoCentavos,
    Integer tempoPreparoMinutos,
    boolean disponivel,
    List<Long> categoriasIds,
    String fotoUrl
) {}