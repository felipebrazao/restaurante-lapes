package com.restaurante.lapes.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurante.lapes.back.dto.UsuarioRequestDTO;
import com.restaurante.lapes.back.dto.UsuarioResponseDTO;
import com.restaurante.lapes.back.enums.Role;
import com.restaurante.lapes.back.model.Usuario;
import com.restaurante.lapes.back.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
	
	public UsuarioResponseDTO salvarUsuario (UsuarioRequestDTO dto) {
		Usuario usuario = new Usuario(
				dto.nome(),
				dto.email(),
				passwordEncoder.encode(dto.senha()),
				Role.CUSTOMER
				);
		
	Usuario salvo = usuarioRepository.save(usuario);
	
	return new UsuarioResponseDTO(
			salvo.getId(),
			salvo.getNome(),
			salvo.getEmail(),
			salvo.getRole()
			);
	}
	
	public void deletarUsuario(Long id) {
		usuarioRepository.deleteById(id);;
	}
	
}
