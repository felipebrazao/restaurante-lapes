package com.restaurante.lapes.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.restaurante.lapes.back.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByEmail (String email);
}
