import { useState } from "react";
import { UsuarioService } from "../services/usuarioService";
import type { RegistroFormulario } from "../types/usuario";

export default function Register() {
    const [formulario, setFormulario] = useState<RegistroFormulario>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value} = e.target;
        setFormulario ({ ...formulario, [name]: value});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (formulario.senha !== formulario.confirmarSenha) {
            alert("As senhas não coincidem.")
            return;
        }

        try {
            await UsuarioService.registrar({
                nome: formulario.nome,
                email: formulario.email,
                senha: formulario.senha,
            });
            alert("Usuário registrado com sucesso!");
        } catch (erro) {
            alert("Erro ao registrar usuário.");
            console.error(erro);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded p-8 shadow"
                >
                <h2 className="text-2x1 font-bold mb-6 text-center">Cadastro</h2>

                <label className="block mb-2 font-semibold" htmlFor="none">
                    Nome
                </label>
                <input
                id="nome"
                name="nome"
                value={formulario.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <label className="block mb-2 font-semibold" htmlFor="email">
                    Email
                </label>
                <input
                id="email"
                name="email"
                type="email"
                value={formulario.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <label className="block mb-2 font-semibold" htmlFor="senha">
                    Senha
                </label>
                <input
                id="senha"
                name="senha"
                type="password"
                value={formulario.senha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <label className="block mb-2 font-semibold" htmlFor="confirmarSenha" >
                    Confirmar Senha
                </label>
                <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={formulario.confirmarSenha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
                />

                <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}