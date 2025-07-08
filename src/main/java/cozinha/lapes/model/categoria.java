package cozinha.lapes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class categoria {
    @Id @GeneratedValue
    private Long id;
    private String nome;
    private String Descriçao;
    private String icone;
}
