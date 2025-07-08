export interface RegistroRequest{
    nome: string;
    email: string;
    senha: string;
}

export interface RegistroFormulario extends RegistroRequest {
    confirmarSenha: string;
}