package com.restaurante.lapes.back.dto.pedido;

import java.util.List;

import lombok.Data;

@Data
public class PedidoResponseDTO {
    private Long id;
    private Integer totalCentavos;
    private Integer tempoPreparoMinutos;
    private String status;
    private String enderecoEntrega;
    private String observacoes;
    private List<ItemPedidoResponseDTO> itens;
}