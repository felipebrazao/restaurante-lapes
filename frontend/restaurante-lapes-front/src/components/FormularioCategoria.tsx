import React, { useState } from "react";

interface FormularioCategoriaProps {
  onSubmit: (nome: string, descricao: string) => void;
  onDelete?: () => void;
  modoExclusao?: boolean;
}

export default function FormularioCategoria({ 
  onSubmit, 
  onDelete, 
  modoExclusao = false 
}: FormularioCategoriaProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && descricao.trim()) {
      onSubmit(nome, descricao);
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
          disabled={modoExclusao}
          required
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da categoria"
          className="border p-2 w-full rounded"
          rows={3}
          disabled={modoExclusao}
          required
        />
      </div>

      <div className="flex gap-2">
        {!modoExclusao && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1"
          >
            Salvar Categoria
          </button>
        )}

        {modoExclusao && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Confirmar Exclusão
          </button>
        )}
      </div>
    </form>
  );
}