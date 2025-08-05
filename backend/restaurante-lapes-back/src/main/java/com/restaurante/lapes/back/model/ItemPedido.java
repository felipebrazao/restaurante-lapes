package com.restaurante.lapes.back.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "itens_pedido")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantidade;

    @Column(name = "preco_unitario_centavos")
    private Integer precoUnitarioCentavos;

    @Column(name = "subtotal_centavos")
    private Integer subtotalCentavos;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "item_cardapio_id")
    private ItemCardapio itemCardapio;
}