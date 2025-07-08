package com.restaurante.lapes.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurante.lapes.back.dto.LoginRequestDTO;
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
	@GetMapping("/{id}")
	public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable Long id) {
	     return ResponseEntity.ok(usuarioService.buscarPorId(id));
	}
	
	@PostMapping("/login")
	public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginRequestDTO loginDTO){
		UsuarioResponseDTO usuario = usuarioService.autenticar(loginDTO.email(), loginDTO.senha());
		return ResponseEntity.ok(usuario);
	}

	@PutMapping("/{id}")
	public ResponseEntity<UsuarioResponseDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioRequestDTO dto) {
	     return ResponseEntity.ok(usuarioService.atualizarUsuario(id, dto));
	}
}
