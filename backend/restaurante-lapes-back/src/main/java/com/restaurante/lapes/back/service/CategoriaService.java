package com.restaurante.lapes.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.restaurante.lapes.back.dto.menu.CategoriaRequestDTO;
import com.restaurante.lapes.back.dto.menu.CategoriaResponseDTO;
import com.restaurante.lapes.back.model.Categoria;
import com.restaurante.lapes.back.repository.CategoriaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoriaService {

	private final CategoriaRepository categoriaRepository;
	
	 public CategoriaService(CategoriaRepository categoriaRepository) {
	        this.categoriaRepository = categoriaRepository;
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

	    public void deletar(Long id) {
	        if (!categoriaRepository.existsById(id)) {
	            throw new EntityNotFoundException("Categoria não encontrada");
	        }
	        categoriaRepository.deleteById(id);
	    }
}
