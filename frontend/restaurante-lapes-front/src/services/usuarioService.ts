import axios from "axios";
import type { RegistroRequest } from "../types/usuario";

const API_BASE = "http://localhost:8080";

export const UsuarioService = {
    async registrar(dados: RegistroRequest): Promise<void> {
        try {
            await axios.post(`${API_BASE}/usuarios`, dados);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao registrar usuário ");
        }
},
};