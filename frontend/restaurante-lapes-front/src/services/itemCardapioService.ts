import api from "./api";

export const listarItens = async (categoriaId: number) => {
  const response = await api.get(`/menu/categories/${categoriaId}/itens`);
  return response.data;
};

export const criarItem = async (dados: any) => {
  const response = await api.post("/menu/itens", dados);
  return response.data;
};

export const atualizarItem = async (itemId: number, dados: any) => {
  const response = await api.put(`menu/itens/${itemId}`, dados);
  return response.data;
};

export const deletarItem = async (itemId: number) => {
  await api.delete(`/menu/itens/${itemId}`)
}