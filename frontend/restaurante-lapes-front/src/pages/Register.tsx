import { useState } from "react";
import { UsuarioService } from "../services/usuarioService";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { RegistroFormulario } from "../types/usuario";
import { Input } from "../components/Input";

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
      onClick={() => navigate('/')}
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
       <Input
       label="Nome"
       name="nome"
       type="name"
       value={formulario.nome}
       onChange={handleChange}
       />
      </div>

      <div className="mb-4">
        <Input
       label="Email"
       name="email"
       type="email"
       value={formulario.email}
       onChange={handleChange}
       />
      </div>

      <div className="mb-4">
        <Input
       label="Senha"
       name="senha"
       type="password"
       value={formulario.senha}
       onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <Input
       label="ConfirmaSenha"
       name="confirmarSenha"
       type="password"
       value={formulario.confirmarSenha}
       onChange={handleChange}
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