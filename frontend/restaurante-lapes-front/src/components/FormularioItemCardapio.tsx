import React, { useState } from "react";

interface Categoria {
  id: number;
  nome: string;
}

interface FormularioItemCardapioProps {
  categorias: Categoria[];
  itemId?: number; // novo: para identificar se está editando
  onSubmit: (item: {
    nome: string;
    descricao: string;
    precoCentavos: number;
    tempoPreparoMinutos: number;
    disponivel: boolean;
    fotoUrl: string;
    categoriasIds: number[];
  }) => void;
  onDelete?: (itemId: number) => void; // novo: função de deletar
}

export default function FormularioItemCardapio({
  categorias,
  itemId,
  onSubmit,
  onDelete,
}: FormularioItemCardapioProps) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    precoCentavos: 0,
    tempoPreparoMinutos: 0,
    disponivel: true,
    fotoUrl: "",
    categoriasIds: [] as number[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let newValue: string | number | boolean = value;

    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "checkbox"
    ) {
      newValue = e.target.checked;
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCategoriaChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selecionadas = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    setForm((prev) => ({
      ...prev,
      categoriasIds: selecionadas,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      precoCentavos: Number(form.precoCentavos),
      tempoPreparoMinutos: Number(form.tempoPreparoMinutos),
    });
  };

  const handleDelete = () => {
    if (itemId && onDelete) {
      onDelete(itemId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nome"
        placeholder="Nome do item"
        value={form.nome}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="descricao"
        placeholder="Descrição do item"
        value={form.descricao}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="precoCentavos"
        type="number"
        placeholder="Preço (em centavos)"
        value={form.precoCentavos}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="tempoPreparoMinutos"
        type="number"
        placeholder="Tempo de preparo (min)"
        value={form.tempoPreparoMinutos}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="fotoUrl"
        type="text"
        placeholder="URL da foto"
        value={form.fotoUrl}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="disponivel"
          checked={form.disponivel}
          onChange={handleChange}
        />
        Disponível
      </label>

      <select
        multiple
        value={form.categoriasIds.map(String)}
        onChange={handleCategoriaChange}
        className="border p-2 w-full h-32"
      >
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar Item
        </button>

        {itemId && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Excluir Item
          </button>
        )}
      </div>
    </form>
  );
}