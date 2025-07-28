import api from "./api";

export const listarItens = async (categoriaId: number) => {
  const response = await api.get(`/menu/categories/${categoriaId}/itens`);
  return response.data;
};