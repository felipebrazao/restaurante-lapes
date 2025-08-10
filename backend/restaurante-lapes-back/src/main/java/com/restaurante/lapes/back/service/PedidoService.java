package com.restaurante.lapes.back.service;

import com.restaurante.lapes.back.dto.pedido.ItemPedidoResponseDTO;
import com.restaurante.lapes.back.dto.pedido.PedidoRequestDTO;
import com.restaurante.lapes.back.dto.pedido.PedidoRequestDTO.ItemPedidoDTO;
import com.restaurante.lapes.back.dto.pedido.PedidoResponseDTO;
import com.restaurante.lapes.back.enums.StatusPedido;
import com.restaurante.lapes.back.model.*;
import com.restaurante.lapes.back.repository.*;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ItemCardapioRepository itemCardapioRepository;
    
    public PedidoResponseDTO toResponseDTO(Pedido pedido) {
        List<ItemPedidoResponseDTO> itensDTO = pedido.getItens().stream()
            .map(item -> {
                ItemPedidoResponseDTO dto = new ItemPedidoResponseDTO();
                dto.setNome(item.getItemCardapio().getNome());
                dto.setQuantidade(item.getQuantidade());
                dto.setPrecoUnitarioCentavos(item.getPrecoUnitarioCentavos());
                dto.setSubtotalCentavos(item.getSubtotalCentavos());
                return dto;
            }).toList();

        PedidoResponseDTO response = new PedidoResponseDTO();
        response.setId(pedido.getId());
        response.setTotalCentavos(pedido.getTotalCentavos());
        response.setTempoPreparoMinutos(pedido.getTempoPreparoMinutos());
        response.setStatus(pedido.getStatus());
        response.setEnderecoEntrega(pedido.getEnderecoEntrega());
        response.setObservacoes(pedido.getObservacoes());
        response.setItens(itensDTO);

        return response;
    }

    @Transactional
    public Pedido criarPedido(PedidoRequestDTO dto) {
        Usuario cliente = usuarioRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        List<ItemPedido> itens = new ArrayList<>();
        int totalCentavos = 0;
        int tempoTotal = 0;

        for (ItemPedidoDTO itemDTO : dto.getItens()) {
            ItemCardapio item = itemCardapioRepository.findById(itemDTO.getItemCardapioId())
                    .orElseThrow(() -> new EntityNotFoundException("Item de cardápio não encontrado: ID " + itemDTO.getItemCardapioId()));

            if (!item.isDisponivel()) {
                throw new IllegalStateException("Item indisponível: " + item.getNome());
            }

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setItemCardapio(item);
            itemPedido.setQuantidade(itemDTO.getQuantidade());
            itemPedido.setPrecoUnitarioCentavos(item.getPrecoCentavos());
            itemPedido.setSubtotalCentavos(item.getPrecoCentavos() * itemDTO.getQuantidade());

            totalCentavos += itemPedido.getSubtotalCentavos();
            tempoTotal += item.getTempoPreparoMinutos(); 

            itens.add(itemPedido);
        }

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setEnderecoEntrega(dto.getEnderecoEntrega());
        pedido.setObservacoes(dto.getObservacoes());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setCriadoEm(LocalDateTime.now());
        pedido.setTotalCentavos(totalCentavos);
        pedido.setTempoPreparoMinutos(tempoTotal);
        pedido.setItens(itens);

        
        for (ItemPedido item : itens) {
            item.setPedido(pedido);
        }

        return pedidoRepository.save(pedido);
    }
    
    public List<PedidoResponseDTO> listarPedidos() {
        List<Pedido> pedidos = pedidoRepository.findAll();

        return pedidos.stream().map(pedido -> {
            PedidoResponseDTO dto = new PedidoResponseDTO();
            dto.setId(pedido.getId());
            dto.setTotalCentavos(pedido.getTotalCentavos());
            dto.setTempoPreparoMinutos(pedido.getTempoPreparoMinutos());
            dto.setStatus(pedido.getStatus());
            dto.setEnderecoEntrega(pedido.getEnderecoEntrega());
            dto.setObservacoes(pedido.getObservacoes());

            List<ItemPedidoResponseDTO> itensDTO = pedido.getItens().stream().map(item -> {
                ItemPedidoResponseDTO itemDTO = new ItemPedidoResponseDTO();
                itemDTO.setNome(item.getItemCardapio().getNome());
                itemDTO.setQuantidade(item.getQuantidade());
                itemDTO.setPrecoUnitarioCentavos(item.getPrecoUnitarioCentavos());
                itemDTO.setSubtotalCentavos(item.getSubtotalCentavos());
                return itemDTO;
            }).toList();

            dto.setItens(itensDTO);

            return dto;
        }).toList();
    }
}