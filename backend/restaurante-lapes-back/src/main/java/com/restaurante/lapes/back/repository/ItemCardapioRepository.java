package com.restaurante.lapes.back.repository;

import com.restaurante.lapes.back.model.ItemCardapio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCardapioRepository extends JpaRepository<ItemCardapio, Long> {
	 List<ItemCardapio> findByCategoriasId(Long categoriaId);
}