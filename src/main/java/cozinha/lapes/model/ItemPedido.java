package cozinha.lapes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemPedido {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne
    private ItemCardapio item;
    private Integer quantidade;
    @ManyToOne
    private pedido pedido;
}
