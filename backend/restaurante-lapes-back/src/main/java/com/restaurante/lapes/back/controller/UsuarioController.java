package com.restaurante.lapes.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurante.lapes.back.dto.UsuarioRequestDTO;
import com.restaurante.lapes.back.dto.UsuarioResponseDTO;
import com.restaurante.lapes.back.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping
	public UsuarioResponseDTO criarUsuario(@RequestBody @Valid UsuarioRequestDTO dto) {
		return usuarioService.salvarUsuario(dto);
	}
	
	@DeleteMapping("/{id}")
	public void deletarUsuario(@PathVariable Long id) {
		usuarioService.deletarUsuario(id);
	}
}
