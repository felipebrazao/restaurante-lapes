import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cardapio() {
  const { usuario } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [pratos, setPratos] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    async function carregarPratos() {
      try {
        // Aqui você pode usar seu service de pratos futuramente
        // const dados = await PratoService.listar();
        // setPratos(dados);
      } catch (err) {
        setErro("Erro ao carregar o cardápio.");
      } finally {
        setLoading(false);
      }
    }

    carregarPratos();
  }, [usuario]);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (loading) return <div>Carregando cardápio...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cardápio</h1>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {/* Aqui entra a renderização do cardápio */}
      <p>Exibindo pratos filtrados por categoria, busca, etc...</p>
    </div>
  );
}