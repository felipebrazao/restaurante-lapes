import React from "react";

interface ItemCardProps {
  item: {
    id: number;
    nome: string;
    descricao: string;
    precoCentavos: number;
    tempoPreparoMinutos: number;
    categorias: { id: number; nome: string }[];
    fotoUrl?: string;
  };
  onDelete?: (id: number) => void; // botão opcional de exclusão
}

export default function ItemCard({ item, onDelete }: ItemCardProps) {
  return (
    <div className="border rounded-xl shadow-md p-4 flex gap-4 relative">
      {item.fotoUrl ? (
        <img
          src={item.fotoUrl}
          alt={item.nome}
          className="w-32 h-32 object-cover rounded"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Sem imagem
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-lg font-semibold">{item.nome}</h2>
        <p className="text-sm text-gray-600">{item.descricao}</p>
        <p className="text-sm mt-1">
          <strong>Preço:</strong> R$ {(item.precoCentavos / 100).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Tempo:</strong> {item.tempoPreparoMinutos} min
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {item.categorias
            ?.filter((cat) => cat && cat.id !== undefined)
            .map((cat) => (
              <span
                key={`cat-${cat.id}`}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
              >
                {cat.nome}
              </span>
            ))}
        </div>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
