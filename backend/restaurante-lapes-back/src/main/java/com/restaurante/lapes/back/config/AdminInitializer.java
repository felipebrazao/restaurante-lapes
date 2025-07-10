package com.restaurante.lapes.back.config;


import org.springframework.stereotype.Component;

import com.restaurante.lapes.back.enums.Role;
import com.restaurante.lapes.back.model.Usuario;
import com.restaurante.lapes.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Component
public class AdminInitializer implements CommandLineRunner {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
	
	@Override
	public void run(String... args) throws Exception {
		String emailAdmin = "felipebrazao@outlook.com";
		
		if(usuarioRepository.findByEmail(emailAdmin).isEmpty()) {
			Usuario admin = new Usuario(
					"Administrador",
					emailAdmin,
					passwordEncoder.encode("felipe123"),
					Role.ADMIN
				);
			usuarioRepository.save(admin);
			System.out.println("Usuário ADMIN criado com sucesso");
		}
	}

}
