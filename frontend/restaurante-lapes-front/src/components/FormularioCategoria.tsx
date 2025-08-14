import React, { useState } from "react";

interface FormularioCategoriaProps {
  onSubmit: (nome: string, descricao: string) => void;
}

export default function FormularioCategoria({
  onSubmit,
}: FormularioCategoriaProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && descricao.trim()) {
      onSubmit(nome.trim(), descricao.trim());
      setNome("");
      setDescricao("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da categoria"
          className="border p-2 w-full rounded"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Salvar Categoria
      </button>
    </form>
  );
}