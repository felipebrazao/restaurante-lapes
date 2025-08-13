import React, { useEffect, useState } from "react";
import { criarPedido } from "../services/PedidoService";
import type { ItemCarrinho } from "../services/PedidoService";
import { useNavigate } from "react-router-dom";

export default function Pedido() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo));
  }, []);

  const total = carrinho.reduce((acc, item) => acc + item.precoCentavos * item.quantidade, 0);

  const confirmarPedido = async () => {
    if (!endereco) {
      alert("Informe o endereço de entrega.");
      return;
    }
    setLoading(true);
    try {
      await criarPedido(carrinho, endereco, observacoes);
      alert("Pedido criado com sucesso!");
      localStorage.removeItem("carrinho");
      navigate("/cardapio"); 
    } catch (err: any) {
      alert("Erro ao criar pedido: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (carrinho.length === 0) {
    return <p className="p-6">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Resumo do Pedido</h1>

      {carrinho.map(item => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.nome} x {item.quantidade}</span>
          <span>R$ {(item.precoCentavos * item.quantidade / 100).toFixed(2)}</span>
        </div>
      ))}

      <div className="flex justify-between font-semibold mt-2">
        <span>Total:</span>
        <span>R$ {(total / 100).toFixed(2)}</span>
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">Endereço de entrega</label>
        <input
          type="text"
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mt-2">
        <label className="block mb-1 font-semibold">Observações</label>
        <textarea
          value={observacoes}
          onChange={e => setObservacoes(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={confirmarPedido}
        disabled={loading}
        className="mt-4 w-full bg-primario text-white py-2 rounded hover:brightness-90"
      >
        {loading ? "Criando pedido..." : "Confirmar Pedido"}
      </button>
    </div>
  );
}