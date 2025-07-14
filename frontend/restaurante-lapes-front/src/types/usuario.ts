export interface RegistroRequest{
    nome: string;
    email: string;
    senha: string;
}

export interface RegistroFormulario extends RegistroRequest {
    confirmarSenha: string;
}

export interface LoginRequest{
    email: string;
    senha: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export type LoginResponse = {
  acessToken: string;
  refreshToken: string;
  usuario: UsuarioResponse;
};