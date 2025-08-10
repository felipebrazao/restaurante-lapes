package com.restaurante.lapes.back.dto.pedido;

import java.util.List;

import com.restaurante.lapes.back.enums.StatusPedido;

import lombok.Data;

@Data
public class PedidoResponseDTO {
    private Long id;
    private Integer totalCentavos;
    private Integer tempoPreparoMinutos;
    private StatusPedido status;
    private String enderecoEntrega;
    private String observacoes;
    private List<ItemPedidoResponseDTO> itens;
}