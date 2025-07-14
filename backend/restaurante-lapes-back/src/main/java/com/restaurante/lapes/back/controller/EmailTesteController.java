package com.restaurante.lapes.back.controller;

import com.restaurante.lapes.back.EmailService.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailTesteController {

    private final EmailService emailService;

    public EmailTesteController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/teste")
    public String enviarEmailTeste() {
        emailService.enviarEmailConfirmacao(
                "destinatario@exemplo.com",
                "Andrey",
                "123456abcdef"
        );
        return "Email enviado!";
    }
}