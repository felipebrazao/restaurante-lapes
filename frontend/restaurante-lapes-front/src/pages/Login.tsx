import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";

export default function Login() {
  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErro("");

  try {
    const usuarioLogado = await login(formulario.email, formulario.senha);

    console.log("Usuário logado:", usuarioLogado);

    if (usuarioLogado.usuario.role === "ADMIN") {
      navigate("/admin"); 
    } else {
      navigate("/cardapio");
    }
  } catch (err: any) {
    setErro(err.message);
  }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/src/assets/cafe2.jpg')",
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
          <Input
          label="Email"
          name="email"
          type="email"
          value={formulario.email}
          onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <Input
          label="Senha"
          name="senha"
          type="password"
          value={formulario.senha}
          onChange={handleChange}
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