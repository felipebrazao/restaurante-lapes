package com.restaurante.lapes.back.service;

import com.restaurante.lapes.back.dto.menu.ItemCardapioRequestDTO;
import com.restaurante.lapes.back.dto.menu.ItemCardapioResponseDTO;
import com.restaurante.lapes.back.model.Categoria;
import com.restaurante.lapes.back.model.ItemCardapio;
import com.restaurante.lapes.back.repository.CategoriaRepository;
import com.restaurante.lapes.back.repository.ItemCardapioRepository;


import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemCardapioService {

    private final ItemCardapioRepository itemCardapioRepository;
    private final CategoriaRepository categoriaRepository;

    public ItemCardapioService(ItemCardapioRepository itemCardapioRepository,
                               CategoriaRepository categoriaRepository) {
        this.itemCardapioRepository = itemCardapioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public ItemCardapioResponseDTO criar(ItemCardapioRequestDTO dto) {
        validarDados(dto);
        ItemCardapio item = new ItemCardapio();
        aplicarDTOEmEntidade(dto, item);
        item = itemCardapioRepository.save(item);
        return toResponseDTO(item);
    }

    public List<ItemCardapioResponseDTO> listarTodos() {
        return itemCardapioRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ItemCardapioResponseDTO buscarPorId(Long id) {
        ItemCardapio item = itemCardapioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado"));
        return toResponseDTO(item);
    }

    public ItemCardapioResponseDTO atualizar(Long id, ItemCardapioRequestDTO dto) {
        validarDados(dto);
        ItemCardapio item = itemCardapioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado"));

        aplicarDTOEmEntidade(dto, item);
        item = itemCardapioRepository.save(item);
        return toResponseDTO(item);
    }

    public void deletar(Long id) {
        if (!itemCardapioRepository.existsById(id)) {
            throw new EntityNotFoundException("Item não encontrado");
        }
        itemCardapioRepository.deleteById(id);
    }

    public List<ItemCardapioResponseDTO> listarItensPorCategoria(Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));

        List<ItemCardapio> itens = itemCardapioRepository.findByCategoriasId(categoriaId);

        return itens.stream()
        		.map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private void aplicarDTOEmEntidade(ItemCardapioRequestDTO dto, ItemCardapio item) {
        item.setNome(dto.nome());
        item.setDescricao(dto.descricao());
        item.setPrecoCentavos(dto.precoCentavos());
        item.setTempoPreparoMinutos(dto.tempoPreparoMinutos());
        item.setDisponivel(dto.disponivel());
        item.setFotoUrl(dto.fotoUrl());

        List<Categoria> categorias = categoriaRepository.findAllById(dto.categoriasIds());
        item.setCategorias(categorias);
    }

    private ItemCardapioResponseDTO toResponseDTO(ItemCardapio item) {
        List<String> nomesCategorias = item.getCategorias().stream()
                .map(Categoria::getNome)
                .toList();

        return new ItemCardapioResponseDTO(
                item.getId(),
                item.getNome(),
                item.getDescricao(),
                item.getPrecoCentavos(),
                item.getTempoPreparoMinutos(),
                item.isDisponivel(),
                nomesCategorias,
                item.getFotoUrl()
        );
    }

    private void validarDados(ItemCardapioRequestDTO dto) {
        if (dto.precoCentavos() < 0) {
            throw new IllegalArgumentException("Preço não pode ser negativo");
        }
    }
}