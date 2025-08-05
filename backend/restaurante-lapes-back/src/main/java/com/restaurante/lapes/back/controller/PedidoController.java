package com.restaurante.lapes.back.controller;

import com.restaurante.lapes.back.dto.pedido.PedidoRequestDTO;
import com.restaurante.lapes.back.dto.pedido.PedidoResponseDTO;
import com.restaurante.lapes.back.model.Pedido;
import com.restaurante.lapes.back.service.PedidoService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoResponseDTO> criarPedido(@Valid @RequestBody PedidoRequestDTO dto) {
        Pedido novoPedido = pedidoService.criarPedido(dto);
        PedidoResponseDTO response = pedidoService.toResponseDTO(novoPedido);
        return ResponseEntity.ok(response);
    }
}