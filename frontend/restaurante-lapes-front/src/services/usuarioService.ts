import axios from "axios";
import type { RegistroRequest, LoginRequest, UsuarioResponse, LoginResponse } from "../types/usuario";

const API_BASE = "http://localhost:8080";

export const UsuarioService = {
  async registrar(dados: RegistroRequest): Promise<void> {
    try {
      await axios.post(`${API_BASE}/auth/register`, dados);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao registrar usuário");
    }
  },

  async login(dados: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE}/auth/login`, dados);

    const { acessToken, refreshToken, usuario } = response.data;

    localStorage.setItem("accessToken", acessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
},

  getUsuarioLogado(): UsuarioResponse | null {
    const json = localStorage.getItem("usuario");
    if (!json) return null;
    try {
      return JSON.parse(json) as UsuarioResponse;
    } catch {
      return null;
    }
  },

  removerTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuario");
  },


  salvarTokens(acessToken: string, refreshToken: string, usuario: UsuarioResponse) {
  localStorage.setItem("accessToken", acessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("usuario", JSON.stringify(usuario));
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },

  async refreshToken() {
    try {
      const refreshToken = UsuarioService.getRefreshToken();
      const response = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch {
      UsuarioService.logout();
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  },
};