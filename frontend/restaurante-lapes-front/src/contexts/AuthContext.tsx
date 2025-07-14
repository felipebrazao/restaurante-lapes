import { createContext, useContext, useEffect, useState } from "react";
import { UsuarioService } from "../services/usuarioService";
import type { UsuarioResponse, LoginResponse } from "../types/usuario";

interface AuthContextType {
  usuario: UsuarioResponse | null;
  isAutenticado: boolean;
  login: (email: string, senha: string) => Promise<LoginResponse>;
  logout: () => void;
  carregarUsuario: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);

  const carregarUsuario = () => {
    try {
      const usuarioSalvo = UsuarioService.getUsuarioLogado();
      if (usuarioSalvo) {
        setUsuario(usuarioSalvo);
      }
    } catch {
      setUsuario(null);
    }
  };

  const login = async (email: string, senha: string) => {
    const resposta = await UsuarioService.login({ email, senha });
    UsuarioService.salvarTokens(resposta.acessToken, resposta.refreshToken, resposta.usuario);
    setUsuario(resposta.usuario);
    return resposta;
  };

  const logout = () => {
    UsuarioService.removerTokens();
    setUsuario(null);
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAutenticado: !!usuario,
        login,
        logout,
        carregarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro do AuthProvider");
  }
  return context;
};