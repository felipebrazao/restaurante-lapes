package com.restaurante.lapes.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.restaurante.lapes.back.dto.menu.CategoriaRequestDTO;
import com.restaurante.lapes.back.dto.menu.CategoriaResponseDTO;
import com.restaurante.lapes.back.model.Categoria;
import com.restaurante.lapes.back.model.ItemCardapio;
import com.restaurante.lapes.back.repository.CategoriaRepository;
import com.restaurante.lapes.back.repository.ItemCardapioRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CategoriaService {

	private final CategoriaRepository categoriaRepository;
	private final ItemCardapioRepository itemRepository;
	
	 public CategoriaService(CategoriaRepository categoriaRepository, ItemCardapioRepository itemRepository) {
	        this.categoriaRepository = categoriaRepository;
	        this.itemRepository = itemRepository;
	    }

	    public CategoriaResponseDTO criarCategoria(CategoriaRequestDTO dto) {
	        Categoria categoria = new Categoria();
	        categoria.setNome(dto.nome());
	        categoria.setDescricao(dto.descricao());

	        categoria = categoriaRepository.save(categoria);
	        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome(), categoria.getDescricao());
	    }

	    public List<CategoriaResponseDTO> listarTodas() {
	        return categoriaRepository.findAll().stream()
	                .map(c -> new CategoriaResponseDTO(c.getId(), c.getNome(), c.getDescricao()))
	                .collect(Collectors.toList());
	    }

	    public CategoriaResponseDTO buscarPorId(Long id) {
	        Categoria categoria = categoriaRepository.findById(id)
	                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
	        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome(), categoria.getDescricao());
	    }

	    public CategoriaResponseDTO atualizar(Long id, CategoriaRequestDTO dto) {
	        Categoria categoria = categoriaRepository.findById(id)
	                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));

	        categoria.setNome(dto.nome());
	        categoria.setDescricao(dto.descricao());

	        categoria = categoriaRepository.save(categoria);
	        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome(), categoria.getDescricao());
	    }

	    @Transactional
	    public void deletar(Long id) {
	        Categoria categoria = categoriaRepository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));

	        
	        List<ItemCardapio> itens = itemRepository.findByCategoriasId(id);

	        for (ItemCardapio item : itens) {
	            item.getCategorias().remove(categoria);
	        }

	        itemRepository.saveAll(itens); 
	        categoriaRepository.deleteById(id); 
	    }
}
