import { useState } from "react";
import { UsuarioService } from "../services/usuarioService";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { RegistroFormulario } from "../types/usuario";


export default function Register() {
    const [formulario, setFormulario] = useState<RegistroFormulario>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    const navigate = useNavigate();
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
  <div
    className="min-h-screen flex items-center justify-center px-4"
    style={{
      backgroundImage: "url('/src/assets/cafe3.jpg')",
      backgroundColor: 'var(--color-secundario)',
      fontFamily: 'var(--font-principal)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
    }}
  >
    <button
      onClick={() => navigate('/login')}
      className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow hover:bg-white/50 transition"
      title="Voltar para login"
    >
      <FaArrowLeft className="text-primario" />
    </button>
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full rounded p-8 bg-white/30 backdrop-blur-md shadow"
      style={{
        borderColor: 'var(--color-primario)',
      }}
    >
      <h2
    className="text-6xl font-extrabold mb-6 text-center text-primario"
    style={{
      fontFamily: 'var(--font-destaque)',
     }}
    >
  Cadastro
        </h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Nome</label>
        <input
          id="nome"
          name="nome"
          value={formulario.nome}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formulario.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          value={formulario.senha}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Confirmar Senha</label>
        <input
          id="confirmarSenha"
          name="confirmarSenha"
          type="password"
          value={formulario.confirmarSenha}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white py-2 rounded font-semibold transition duration-200 hover:brightness-90"
        style={{
          backgroundColor: 'var(--color-primario)',
        }}
      >
        Registrar
      </button>
    </form>
  </div>
);
}