package com.restaurante.lapes.back.dto.menu;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ItemCardapioRequestDTO(
    @NotBlank(message = "Nome é obrigatorio") String nome,
    @NotBlank (message = "Descriação é obrigatorio") String descricao,
    @Min(value = 1, message = "O preço não pode ser negativo") Integer precoCentavos,
    @Min (value = 1, message = "O tempo de preparo não pode ser negativo") Integer tempoPreparoMinutos,
    boolean disponivel,
    @NotNull List<Long> categoriasIds,
    @NotBlank (message = "Adicionar foto ao item") String fotoUrl
) {}