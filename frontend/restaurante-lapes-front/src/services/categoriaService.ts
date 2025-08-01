import api from "./api";

export const listarCategorias = async () => {
  const response = await api.get("/menu/categories");
  return response.data;
};

export const criarCategoria = async (categoria: { nome: string; descricao: string }) => {
  const response = await api.post("/menu/categories", categoria);
  return response.data;
};

export const atualizarCategoria = async (id: number, dados: any) => {
  const response = await api.put(`/menu/categories/${id}`, dados);
  return response.data
};

export const deletarCategoria = async (id: number) => {
  await api.delete(`/menu/categories/${id}`);
};