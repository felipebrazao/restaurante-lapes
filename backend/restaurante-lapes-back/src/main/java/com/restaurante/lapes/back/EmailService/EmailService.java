package com.restaurante.lapes.back.EmailService;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Envia um e-mail de confirmação de conta.
     * @param destinatario E-mail do usuário.
     * @param nomeUsuario Nome do usuário (opcional).
     * @param tokenConfirmacao Token para ativação da conta (se aplicável).
     */
    public void enviarEmailConfirmacao(String destinatario, String nomeUsuario, String tokenConfirmacao) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        
        mensagem.setTo(destinatario);
        mensagem.setSubject("Confirmação de Cadastro");
        
        String texto = String.format(
            "Olá %s,\n\n" +
            "Obrigado por se cadastrar em nosso sistema!\n" +
            "Para confirmar sua conta, clique no link abaixo:\n\n" +
            "http://seusite.com/confirmar-conta?token=%s\n\n" +
            "Se você não solicitou este e-mail, ignore-o.",
            nomeUsuario != null ? nomeUsuario : "usuário",
            tokenConfirmacao
        );
        
        mensagem.setText(texto);
        
        mailSender.send(mensagem);
    }
}