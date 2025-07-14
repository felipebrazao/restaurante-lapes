package com.restaurante.lapes.back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@SpringBootApplication
public class LapesApplication {

	public static void main(String[] args) {
		SpringApplication.run(LapesApplication.class, args);
	}

	// Adicione este método aqui
	@Bean
	public CommandLineRunner testEmail(JavaMailSender mailSender) {
		return args -> {
			try {
				SimpleMailMessage message = new SimpleMailMessage();
				message.setTo("seu-outro-email@gmail.com"); // <-- coloque seu e-mail real aqui
				message.setSubject("Teste de envio");
				message.setText("Esse é um teste via Spring Boot");
				message.setFrom("seu-email@gmail.com"); // <-- deve ser igual ao spring.mail.username

				mailSender.send(message);
				System.out.println("✅ E-mail enviado com sucesso!");
			} catch (Exception e) {
				System.out.println("❌ Erro ao enviar e-mail: " + e.getMessage());
				e.printStackTrace();
			}
		};
	}
}
