package com.restaurante.lapes.back.dto.menu;

import java.util.List;

public record ItemCardapioResponseDTO(
    Long id,
    String nome,
    String descricao,
    Integer precoCentavos,
    Integer tempoPreparoMinutos,
    boolean disponivel,
    List<String> categorias,
    String fotoUrl
) {}