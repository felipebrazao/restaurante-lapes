import React, { useState } from "react";

interface Categoria {
  id: number;
  nome: string;
}

interface FormularioItemCardapioProps {
  categorias: Categoria[];
  onSubmit: (item: {
    nome: string;
    descricao: string;
    precoCentavos: number;
    tempoPreparoMinutos: number;
    disponivel: boolean;
    fotoUrl: string;
    categoriasIds: number[];
  }) => void;
}

export default function FormularioItemCardapio({
  categorias,
  onSubmit,
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

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
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

      <div className="space-y-2">
        <p className="font-medium">Categorias:</p>
        <div className="grid grid-cols-2 gap-2">
          {categorias.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.categoriasIds.includes(cat.id)}
                onChange={() => {
                  const selecionado = form.categoriasIds.includes(cat.id);
                  setForm((prev) => ({
                    ...prev,
                    categoriasIds: selecionado
                      ? prev.categoriasIds.filter((id) => id !== cat.id)
                      : [...prev.categoriasIds, cat.id],
                  }));
                }}
              />
              {cat.nome}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Salvar Item
      </button>
    </form>
  );
}