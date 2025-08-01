import React, { useEffect, useState } from "react";
import { listarCategorias } from "../services/categoriaService";
import { listarItens } from "../services/itemCardapioService";
import CategoriaTabs from "../components/CategoriaTabs";
import ItemCard from "../components/ItemCard";

export default function Cardapio() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [loadingItens, setLoadingItens] = useState(false);

  useEffect(() => {
    listarCategorias().then(setCategorias);
  }, []);

  useEffect(() => {
    const carregarItens = async () => {
      if (categoriaSelecionada !== null){
        setLoadingItens(true);
        try{
          const dados = await listarItens(categoriaSelecionada);
          setItens(dados);
        }catch (erro) {
          console.log("Erro ao carregar itens:", erro);
        } finally {
          setLoadingItens(false);
        }
      } else{
        setItens([]);
      }
    };

    carregarItens();
  }, [categoriaSelecionada]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cardápio</h1>

      <CategoriaTabs
        categorias={categorias}
        onSelect={setCategoriaSelecionada}
        categoriaSelecionada={categoriaSelecionada}
      />

      <div className="grid gap-4 mt-6">
        {loadingItens && <p>Carregando itens...</p>}

        {!loadingItens && itens.length === 0 && categoriaSelecionada && (
          <p className="text-gray-500">Nenhum item nesta categoria.</p>
        )}

        {!loadingItens && itens.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}