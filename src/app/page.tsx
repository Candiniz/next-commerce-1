'use client'

import { useEffect, useState } from "react";
import InfiniteScroll from "./components/InfiniteScroll"; // Componente que exibe os produtos
import { fetchProducts } from "./actions"; // Função para buscar os produtos do Stripe
import { ProductType } from "@/types/ProductType";

export default function Page() {
  const [formatedProducts, setFormatedProducts] = useState<ProductType[]>([]); // Produtos de Promoções
  const [formatedProductsNovidades, setFormatedProductsNovidades] = useState<ProductType[]>([]); // Produtos de Novidades

  // Carregar os produtos de Promoções
  useEffect(() => {
    const fetchMainProducts = async () => {
      const { formatedProducts } = await fetchProducts({
        category: 'Bolsas', // Categoria de Promoções
      });
      setFormatedProducts(formatedProducts); // Atualizar estado com produtos de Promoções
    };

    fetchMainProducts();
  }, []); // Só faz a requisição ao carregar o componente

  // Carregar os produtos de Novidades
  useEffect(() => {
    const fetchNovidades = async () => {
      const { formatedProducts } = await fetchProducts({
        category: 'JogoAmericano', // Categoria de Novidades
      });
      setFormatedProductsNovidades(formatedProducts); // Atualizar estado com produtos de Novidades
    };

    fetchNovidades();
  }, []); // Só faz a requisição ao carregar o componente
  

  return (
    <>
      <div className="w-full flex items-center z-10">
            <video
              src="/mainvideo1.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: 'auto' }}
            />
      </div>
      <div className="h-4 bg-pink-500 w-full shadow-2xl shadow-black"></div>
      <div className="h-20 bg-pink-400 flex justify-evenly w-full px-3 shadow-inner">
        <div className="h-full flex items-center justify-center w-1/4 hover:bg-pink-300 text-center tx-sm font-bold transition-all duration-100 md:text-2xl">Bolsas & Acessórios</div>
        <div className="h-full flex items-center justify-center w-1/4 hover:bg-pink-300 text-center tx-sm font-bold transition-all duration-100 md:text-2xl">Jogos Americanos</div>
        <div className="h-full flex items-center justify-center w-1/4 hover:bg-pink-300 text-center tx-sm font-bold transition-all duration-100 md:text-2xl">Vestidos & Saias</div>
        <div className="h-full flex items-center justify-center w-1/4 hover:bg-pink-300 text-center tx-sm font-bold transition-all duration-100 md:text-2xl">Biquinis & Praia</div>
      </div>
      <div className="container mx-auto shadow-2xl bg-white min-h-screen pt-8 px-4 w-[95%] sm:w-4/5 md:w-4/5 lg:w-2/3">
        {/* Seção de Promoções */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <h1 className="text-center text-2xl font-bold mb-6">Produtos em Oferta</h1>
          <InfiniteScroll initialProducts={formatedProducts} category="Bolsas" />
        </div>

        {/* Seção de Novidades */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <h1 className="text-center text-2xl font-bold mb-6">Novidades</h1>
          <InfiniteScroll initialProducts={formatedProductsNovidades} category="JogoAmericano" />
        </div>
      </div>
    </>
  );
}
