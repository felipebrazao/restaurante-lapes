import React from "react";

interface ItemCardProps {
  item: {
    nome: string;
    descricao: string;
    precoCentavos: number;
    tempoPreparoMinutos: number;
    categorias: string[];
    fotoUrl?: string;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="border rounded-xl shadow-md p-4 flex gap-4">
      {item.fotoUrl && (
        <img
          src={item.fotoUrl}
          alt={item.nome}
          className="w-32 h-32 object-cover rounded"
        />
      )}
      <div>
        <h2 className="text-lg font-semibold">{item.nome}</h2>
        <p className="text-sm text-gray-600">{item.descricao}</p>
        <p className="text-sm mt-1">R$ {(item.precoCentavos / 100).toFixed(2)}</p>
        <p className="text-sm text-gray-500">{item.tempoPreparoMinutos} min</p>
      </div>
    </div>
  );
}