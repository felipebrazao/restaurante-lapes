import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarCategorias } from "../services/categoriaService";
import { FiShoppingCart } from "react-icons/fi";
import { listarItens } from "../services/itemCardapioService";
import CategoriaTabs from "../components/CategoriaTabs";
import ItemCard from "../components/ItemCard";

interface ItemCarrinho {
  id: number;
  nome: string;
  precoCentavos: number;
  quantidade: number;
}

export default function Cardapio() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [loadingItens, setLoadingItens] = useState(false);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]); 
    const navigate = useNavigate();

  

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

  const adicionarAoCarrinho = (item: any) => {
  setCarrinho(prev => {
    const existente = prev.find(i => i.id === item.id);
    let novoCarrinho;
    if (existente) {
      novoCarrinho = prev.map(i =>
        i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
      );
    } else {
      novoCarrinho = [...prev, { ...item, quantidade: 1 }];
    }
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    return novoCarrinho;
  });
};

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <div className="absolute top-6 right-6 cursor-pointer"
      onClick={() => navigate("/pedido")}>
        <FiShoppingCart size={32} />
        {carrinho.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
          </span>
        )}
      </div>

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
          <ItemCard
            key={item.id}
            item={item}
            onAdd={() => adicionarAoCarrinho(item)} 
          />
        ))}
      </div>
    </div>
  );
}