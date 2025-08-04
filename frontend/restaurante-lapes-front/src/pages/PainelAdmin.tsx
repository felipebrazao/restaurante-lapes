import React, { useEffect, useState } from "react";
import {
  listarCategorias,
  criarCategoria,
  deletarCategoria,
} from "../services/categoriaService";
import {
  listarItens,
  criarItem,
  deletarItem,
} from "../services/itemCardapioService";
import CategoriaTabs from "../components/CategoriaTabs";
import ItemCard from "../components/ItemCard";
import FormularioCategoria from "../components/FormularioCategoria";
import FormularioItemCardapio from "../components/FormularioItemCardapio";

export default function Admin() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    number | null
  >(null);
  const [categoriaParaExcluir, setCategoriaParaExcluir] = useState<any | null>(
    null
  );
  const [itens, setItens] = useState<any[]>([]);
  const [loadingItens, setLoadingItens] = useState(false);

  useEffect(() => {
    carregarCategorias();
  }, []);

  useEffect(() => {
    const carregarItens = async () => {
      if (categoriaSelecionada !== null) {
        setLoadingItens(true);
        try {
          const dados = await listarItens(categoriaSelecionada);
          setItens(dados);
        } catch (erro) {
          console.log("Erro ao carregar itens:", erro);
        } finally {
          setLoadingItens(false);
        }
      } else {
        setItens([]);
      }
    };

    carregarItens();
  }, [categoriaSelecionada]);

  const carregarCategorias = async () => {
    const dados = await listarCategorias();
    setCategorias(dados);
  };

  const handleCriarCategoria = async (nome: string, descricao: string) => {
    await criarCategoria({ nome, descricao });
    await carregarCategorias();
  };

  const handleDeletarCategoria = async () => {
    if (!categoriaParaExcluir) return;

    if (
      window.confirm(
        `Deseja excluir a categoria "${categoriaParaExcluir.nome}"?`
      )
    ) {
      await deletarCategoria(categoriaParaExcluir.id);
      await carregarCategorias();
      setCategoriaParaExcluir(null);
      if (categoriaSelecionada === categoriaParaExcluir.id) {
        setCategoriaSelecionada(null);
      }
    }
  };

  const handleCriarItem = async (item: any) => {
    await criarItem(item);
    alert("Item criado com sucesso!");
    if (categoriaSelecionada) {
      const dados = await listarItens(categoriaSelecionada);
      setItens(dados);
    }
  };

  const handleDeletarItem = async (itemId: number) => {
    if (window.confirm("Tem certeza que deseja deletar este item?")) {
      try {
        await deletarItem(itemId);
        alert("Item deletado com sucesso!");
        if (categoriaSelecionada) {
          const dados = await listarItens(categoriaSelecionada);
          setItens(dados);
        }
      } catch (erro) {
        console.error("Erro ao deletar item:", erro);
        alert("Erro ao deletar item.");
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Administração do Cardápio</h1>

      <section className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-2">Nova Categoria</h2>
          <FormularioCategoria onSubmit={handleCriarCategoria} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Novo Item</h2>
          <FormularioItemCardapio
            categorias={categorias}
            onSubmit={handleCriarItem}
          />
        </div>
      </section>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">Visualização</h2>
      {categoriaParaExcluir && (
        <div className="bg-red-50 border border-red-200 p-4 rounded mb-4">
          <p className="text-red-700 mb-2">
            Deseja realmente excluir a categoria{" "}
            <strong>{categoriaParaExcluir.nome}</strong>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeletarCategoria}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Confirmar Exclusão
            </button>
            <button
              onClick={() => setCategoriaParaExcluir(null)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <CategoriaTabs
        categorias={categorias}
        onSelect={setCategoriaSelecionada}
        categoriaSelecionada={categoriaSelecionada}
        onDeleteClick={setCategoriaParaExcluir}
      />

      <div className="grid gap-4 mt-6">
        {loadingItens && <p>Carregando itens...</p>}
        {!loadingItens && itens.length === 0 && categoriaSelecionada && (
          <p className="text-gray-500">Nenhum item nesta categoria.</p>
        )}
        {!loadingItens &&
          itens.map((item) => (
            <ItemCard key={item.id} item={item} onDelete={handleDeletarItem} />
          ))}
      </div>
    </div>
  );
}
