import api from "./api";

export interface ItemCarrinho {
  id: number;
  nome: string;
  precoCentavos: number;
  quantidade: number;
}

export const criarPedido = async (itens: ItemCarrinho[], enderecoEntrega: string, observacoes?: string) => {
  const usuarioString = localStorage.getItem("usuario");
  if (!usuarioString) throw new Error("Usuário não autenticado");

  const usuario = JSON.parse(usuarioString);

  const pedido = {
    clienteId: usuario.id,
    enderecoEntrega,
    observacoes: observacoes || "",
    itens: itens.map(i => ({
      itemCardapioId: i.id,
      quantidade: i.quantidade
    }))
  };

  const { data } = await api.post("/orders", pedido);
  return data;
};