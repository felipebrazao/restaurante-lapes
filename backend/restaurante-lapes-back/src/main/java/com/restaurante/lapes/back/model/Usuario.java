package com.restaurante.lapes.back.model;

import com.restaurante.lapes.back.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
	
	public Usuario() {
	}
	
	public Usuario(String nome, String email, String senha, Role role) {
		super();
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.role = role;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	@Column(unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String senha;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
}
