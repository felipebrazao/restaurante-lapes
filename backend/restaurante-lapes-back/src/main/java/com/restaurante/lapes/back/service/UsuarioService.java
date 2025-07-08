package com.restaurante.lapes.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurante.lapes.back.dto.LoginRequestDTO;
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
	
	public UsuarioResponseDTO autenticar (String email,String senha) {
		Usuario usuario = usuarioRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		if (!passwordEncoder.matches(senha, usuario.getSenha())) {
			throw new RuntimeException("Senha inválida");
		}
		
		return new UsuarioResponseDTO(
				usuario.getId(), 
				usuario.getNome(), 
				usuario.getEmail(), 
				usuario.getRole());
	}
	
	public UsuarioResponseDTO buscarPorId(Long id) {
	    Usuario usuario = usuarioRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

	    return new UsuarioResponseDTO(
	        usuario.getId(),
	        usuario.getNome(),
	        usuario.getEmail(),
	        usuario.getRole()
	    );
	}

	
	public UsuarioResponseDTO atualizarUsuario(Long id, UsuarioRequestDTO dto) {
	    Usuario usuario = usuarioRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

	    usuario.setNome(dto.nome());
	    usuario.setEmail(dto.email());
	    if (dto.senha() != null && !dto.senha().isBlank()) {
	        usuario.setSenha(passwordEncoder.encode(dto.senha()));
	    }

	    Usuario atualizado = usuarioRepository.save(usuario);

	    return new UsuarioResponseDTO(
	        atualizado.getId(),
	        atualizado.getNome(),
	        atualizado.getEmail(),
	        atualizado.getRole()
	    );
	}
}
