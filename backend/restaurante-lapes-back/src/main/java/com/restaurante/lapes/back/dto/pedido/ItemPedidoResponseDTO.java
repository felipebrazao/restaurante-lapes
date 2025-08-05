package com.restaurante.lapes.back.dto.pedido;

import lombok.Data;

@Data
public class ItemPedidoResponseDTO {
    private String nome;
    private Integer quantidade;
    private Integer precoUnitarioCentavos;
    private Integer subtotalCentavos;
}
