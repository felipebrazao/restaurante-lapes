import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PainelAdmin() {
  const { usuario } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!usuario) return;

    async function carregarDadosAdmin() {
      try {
        // Aqui entraria o carregamento de categorias/pratos
        // await CategoriaService.listar();
        // await PratoService.listar();
      } catch (e) {
        setErro("Erro ao carregar dados de administração.");
      } finally {
        setLoading(false);
      }
    }

    carregarDadosAdmin();
  }, [usuario]);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.role !== "ADMIN") {
    return <Navigate to="/cardapio" />;
  }

  if (loading) return <div>Carregando painel de administração...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Painel Administrativo</h1>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      <p>Aqui você poderá criar, editar e remover pratos e categorias.</p>
    </div>
  );
}