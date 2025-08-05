package com.restaurante.lapes.back.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.restaurante.lapes.back.enums.StatusPedido;

@Data
@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    private String enderecoEntrega;
    private String observacoes;

    private Integer tempoPreparoMinutos;
    private Integer totalCentavos;

    private LocalDateTime criadoEm;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itens;
}
