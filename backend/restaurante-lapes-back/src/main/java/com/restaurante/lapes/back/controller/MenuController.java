package com.restaurante.lapes.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.restaurante.lapes.back.dto.menu.CategoriaRequestDTO;
import com.restaurante.lapes.back.dto.menu.CategoriaResponseDTO;
import com.restaurante.lapes.back.dto.menu.ItemCardapioRequestDTO;
import com.restaurante.lapes.back.dto.menu.ItemCardapioResponseDTO;
import com.restaurante.lapes.back.service.CategoriaService;
import com.restaurante.lapes.back.service.ItemCardapioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/menu")
public class MenuController {

	private final CategoriaService categoriaService;
    private final ItemCardapioService itemCardapioService;
 

    public MenuController(CategoriaService categoriaService, ItemCardapioService itemCardapioService) {
        this.categoriaService = categoriaService;
        this.itemCardapioService = itemCardapioService;
    }

	    @PostMapping("/categories")
	    public CategoriaResponseDTO criar(@RequestBody @Valid CategoriaRequestDTO dto) {
	        return categoriaService.criarCategoria(dto);
	    }

	    @GetMapping("/categories")
	    public List<CategoriaResponseDTO> listarTodas() {
	        return categoriaService.listarTodas();
	    }

	    @GetMapping("/categories/{id}")
	    public CategoriaResponseDTO buscarPorId(@PathVariable Long id) {
	        return categoriaService.buscarPorId(id);
	    }

	    @PutMapping("/categories/{id}")
	    public CategoriaResponseDTO atualizar(@PathVariable Long id, @RequestBody @Valid CategoriaRequestDTO dto) {
	        return categoriaService.atualizar(id, dto);
	    }

	    @DeleteMapping("/categories/{id}")
	    public void deletar(@PathVariable Long id) {
	        categoriaService.deletar(id);
	    }
	    
	  
	    @PostMapping("/itens")
	    public ItemCardapioResponseDTO criarItem(@RequestBody @Valid ItemCardapioRequestDTO dto) {
	        return itemCardapioService.criar(dto);
	    }

	    @GetMapping("/itens")
	    public List<ItemCardapioResponseDTO> listarItens() {
	        return itemCardapioService.listarTodos();
	    }

	    @GetMapping("/itens/{id}")
	    public ItemCardapioResponseDTO buscarItemPorId(@PathVariable Long id) {
	        return itemCardapioService.buscarPorId(id);
	    }

	    @PutMapping("/itens/{id}")
	    public ItemCardapioResponseDTO atualizarItem(@PathVariable Long id, @RequestBody @Valid ItemCardapioRequestDTO dto) {
	        return itemCardapioService.atualizar(id, dto);
	    }

	    @DeleteMapping("/itens/{id}")
	    public void deletarItem(@PathVariable Long id) {
	        itemCardapioService.deletar(id);
	    }
	    
	    @GetMapping("/categories/{categoriaId}/itens")
	    public ResponseEntity<List<ItemCardapioResponseDTO>> listarPorCategoria(@PathVariable Long categoriaId) {
	        List<ItemCardapioResponseDTO> itens = itemCardapioService.listarItensPorCategoria(categoriaId);
	        return ResponseEntity.ok(itens);
	    }
	
}
