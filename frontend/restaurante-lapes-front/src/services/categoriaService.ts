import api from "./api";

export const listarCategorias = async () => {
  const response = await api.get("/menu/categories");
  return response.data;
};