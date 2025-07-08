import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioService } from "../services/usuarioService";
import { Link } from "react-router-dom";

export default function Login() {
  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const usuario = await UsuarioService.login(formulario);
      console.log("Usuário logado:", usuario);
      navigate("/cardapio");
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/src/assets/cafe2.jpg')", // coloque sua imagem nesta pasta
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'var(--font-principal)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full rounded p-8 bg-white/30 backdrop-blur-md shadow"
        style={{
          borderColor: 'var(--color-primario)',
        }}
      >
        <h2
          className="text-6xl font-bold mb-6 text-center text-primario"
          style={{ fontFamily: 'var(--font-destaque)' }}
        >
          Login
        </h2>

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

        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full text-white py-2 rounded font-semibold transition duration-200 hover:brightness-90"
          style={{ backgroundColor: 'var(--color-primario)' }}
        >
          Entrar
        </button>
        <p className="mt-6 text-center text-base text-gray-700">
  Não tem uma conta?{' '}
  <Link
  to="/register"
  className="text-primario font-semibold hover:underline"
>
  Cadastre-se aqui
</Link>
</p>
      </form>
    </div>
  );
}