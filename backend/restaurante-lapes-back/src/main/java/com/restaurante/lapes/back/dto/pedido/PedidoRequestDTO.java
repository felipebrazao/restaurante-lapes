package com.restaurante.lapes.back.dto.pedido;

import lombok.Data;
import java.util.List;

@Data
public class PedidoRequestDTO {

    private Long clienteId;

    private String enderecoEntrega;

    private String observacoes;

    private List<ItemPedidoDTO> itens;

    @Data
    public static class ItemPedidoDTO {
        private Long itemCardapioId;
        private Integer quantidade;
    }
}