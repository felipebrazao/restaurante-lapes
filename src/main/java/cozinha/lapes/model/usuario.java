package cozinha.lapes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class usuario {
    @Id @GeneratedValue

    private Long Id_User;
    private String Nome_user;
    private String email;
    private String Senha;
    private String Role;

}
