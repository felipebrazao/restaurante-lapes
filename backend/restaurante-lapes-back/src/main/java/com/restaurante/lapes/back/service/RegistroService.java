import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class RegistroService {
    @Autowired
    private com.restaurante.lapes.back.repository.UsuarioRepository usuarioRepository;
    @Autowired private TokenRepository tokenRepository;
    @Autowired private EmailService emailService;

    public void registrar(com.restaurante.lapes.back.model.Usuario usuario) {
        usuarioRepository.save(usuario);

        String token = UUID.randomUUID().toString();
        TokenConfirmacao confirmacao = new TokenConfirmacao();
        confirmacao.setToken(token);
        confirmacao.setUsuario(usuario);
        confirmacao.setValidade(LocalDateTime.now().plusHours(24));

        tokenRepository.save(confirmacao);
        emailService.enviarEmailConfirmacao(usuario.getEmail(), token);
    }
}
