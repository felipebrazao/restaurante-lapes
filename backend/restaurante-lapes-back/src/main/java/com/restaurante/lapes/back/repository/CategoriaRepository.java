package com.restaurante.lapes.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurante.lapes.back.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
