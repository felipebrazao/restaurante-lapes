package cozinha.lapes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemCardapio {
    @Id @GeneratedValue

    private Long Id_Cardapio;
    private String Name_Cardapio;
    private String Descriçao_Prato;
    private Integer Preco_centavos;
    private Integer Tempo_preparo;
    private boolean ativo;

    @ManyToOne
    private categoria categoria;
}
