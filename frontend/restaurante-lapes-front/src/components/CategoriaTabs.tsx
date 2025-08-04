import React from "react";

interface CategoriaTabsProps {
  categorias: { id: number; nome: string }[];
  onSelect: (id: number) => void;
  categoriaSelecionada: number | null;
   onDeleteClick?: (categoria: any) => void;
}

export default function CategoriaTabs({
  categorias,
  onSelect,
  categoriaSelecionada,
  onDeleteClick
}: CategoriaTabsProps) {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {categorias.map((categoria) => (
        <div key={categoria.id} className="flex items-center space-x-1">
          <button
            onClick={() => onSelect(categoria.id)}
            className={`px-4 py-2 rounded-full ${
              categoria.id === categoriaSelecionada
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {categoria.nome}
          </button>

          {onDeleteClick && (
            <button
              onClick={() => onDeleteClick(categoria)}
              className="text-red-600 hover:text-red-800 text-sm"
              title="Excluir categoria"
            >
              ❌
            </button>
          )}
        </div>
      ))}
    </div>
  );
}