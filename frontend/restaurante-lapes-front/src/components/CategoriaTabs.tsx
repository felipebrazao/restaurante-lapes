import React from "react";

interface CategoriaTabsProps {
  categorias: { id: number; nome: string }[];
  onSelect: (id: number) => void;
  categoriaSelecionada: number | null;
}

export default function CategoriaTabs({
  categorias,
  onSelect,
  categoriaSelecionada
}: CategoriaTabsProps) {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onSelect(categoria.id)}
          className={`px-4 py-2 rounded-full ${
            categoria.id === categoriaSelecionada
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {categoria.nome}
        </button>
      ))}
    </div>
  );
}