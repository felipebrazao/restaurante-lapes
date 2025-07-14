package com.restaurante.lapes.back.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.restaurante.lapes.back.dto.LoginResponseDTO;
import com.restaurante.lapes.back.dto.RefreshTokenRequestDTO;
import com.restaurante.lapes.back.dto.UsuarioRequestDTO;
import com.restaurante.lapes.back.dto.UsuarioResponseDTO;
import com.restaurante.lapes.back.service.JwtService;
import com.restaurante.lapes.back.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private JwtService jwtService;
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequestDTO dto) {
	    String refreshToken = dto.refreshToken();

	    if (!jwtService.tokenValido(refreshToken)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token inválido ou expirado.");
	    }

	    String email = jwtService.validarToken(refreshToken);
	    if (email == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado.");
	    }

	    String novoAccessToken = jwtService.gerarAccessToken(email);

	    return ResponseEntity.ok(Map.of("accessToken", novoAccessToken));
	}
	
	@PostMapping("/register")
	public UsuarioResponseDTO criarUsuario(@RequestBody @Valid UsuarioRequestDTO dto) {
		return usuarioService.salvarUsuario(dto);
	}
	
	@DeleteMapping("/profile/{id}")
	public void deletarUsuario(@PathVariable Long id) {
		usuarioService.deletarUsuario(id);
	}
	@GetMapping("/profile/{id}")
	public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable Long id) {
	     return ResponseEntity.ok(usuarioService.buscarPorId(id));
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginDTO){
	    LoginResponseDTO response = usuarioService.autenticar(loginDTO.email(), loginDTO.senha());
	    return ResponseEntity.ok(response);
	}

	@PutMapping("/profile/{id}")
	public ResponseEntity<UsuarioResponseDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioRequestDTO dto) {
	     return ResponseEntity.ok(usuarioService.atualizarUsuario(id, dto));
	}
}
