package com.restaurante.lapes.back.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Data
@Entity
@Table(name = "itens_cardapio")
public class ItemCardapio {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String nome;

	    private String descricao;

	    private Integer precoCentavos;

	    private Integer tempoPreparoMinutos;

	    private boolean disponivel;

	    @ManyToMany
	    @JoinTable(
	        name = "item_categoria",
	        joinColumns = @JoinColumn(name = "item_id"),
	        inverseJoinColumns = @JoinColumn(name = "categoria_id")
	    )
	    private List<Categoria> categorias;
	    
	    @Column(name = "foto_url")
	    private String fotoUrl;

	
}
