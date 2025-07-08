package cozinha.lapes.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import cozinha.lapes.model.usuario;
import cozinha.lapes.model.ItemPedido;

@Entity
public class pedido {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private usuario cliente;

    private String tipo; // DELIVERY ou TAKEAWAY
    private String status; // PENDENTE, EM_PREPARO, PRONTO, ENTREGUE etc.
    private Integer totalCentavos;

    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ItemPedido> itens;
}
