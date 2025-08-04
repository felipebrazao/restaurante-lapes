package com.restaurante.lapes.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurante.lapes.back.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
