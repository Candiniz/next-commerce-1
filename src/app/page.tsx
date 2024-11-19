'use client'

import "./globals.css";

import { useEffect, useState } from "react";
import InfiniteScroll from "./components/InfiniteScroll"; // Componente que exibe os produtos
import { fetchProducts } from "./actions"; // Função para buscar os produtos do Stripe
import { ProductType } from "@/types/ProductType";


import { FaShoppingBag } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import Banner1 from "./components/Banner1";




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
      <div className="h-fit bg-pink-400 flex justify-evenly w-full px-3 shadow-inner py-4">
        <button className="h-full flex flex-col gap-2 items-center justify-center w-1/4 hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-lg cursor-pointer"><FaShoppingBag /> Bolsas &<br /> Acessórios</button>
        <button className="h-full flex flex-col gap-2 items-center justify-center w-1/4 hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-lg cursor-pointer"><MdTableBar /> Jogos<br /> Americanos</button>
        <button className="h-full flex flex-col gap-2 items-center justify-center w-1/4 hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-lg cursor-pointer"><GiLargeDress /> Vestidos &<br /> Saias</button>
        <button className="h-full flex flex-col gap-2 items-center justify-center w-1/4 hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-lg cursor-pointer"><FaUmbrellaBeach /> Biquinis &<br /> Praia</button>
      </div>



      <Banner1 />



      <div className="container mx-auto shadow-2xl bg-white min-h-screen pt-8 px-4 w-[95%] sm:w-4/5 md:w-4/5 lg:w-2/3">
        {/* Seção de Promoções */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <div className="w-full h-fit bg-pink-500 mb-5 rounded-md">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">Bolsas & Acessórios</h1>
          </div>
          <InfiniteScroll initialProducts={formatedProducts} category="Bolsas" />
        </div>

        {/* Seção de Novidades */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
        <div className="w-full h-fit bg-pink-500 mb-5 rounded-md">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">Jogos Americanos</h1>
          </div>
          <InfiniteScroll initialProducts={formatedProductsNovidades} category="JogoAmericano" />
        </div>
      </div>
    </>
  );
}
