'use client'

import "./globals.css";

import { useEffect, useState } from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import Image from "next/image";
import bikini1 from "../../src/photos/bikini1.jpg"
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
      <div className="h-4 bg-brown-200 w-full shadow-2xl shadow-black"></div>
      <div className="h-fit bg-white gap-5 flex justify-center w-full px-3 shadow-inner py-4">
        <button
          onClick={() => {
            const el = document.getElementById("bolsas-acessorios");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="h-full px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-sm cursor-pointer"><FaShoppingBag /> Bolsas &<br /> Acessórios</button>
        <button
          onClick={() => {
            const el = document.getElementById("jogos-americanos");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="h-full px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-sm cursor-pointer"><MdTableBar /> Jogos<br /> Americanos</button>
        <button
          onClick={() => {
            const el = document.getElementById("vestidos-saias");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="h-full px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-sm cursor-pointer"><GiLargeDress /> Vestidos &<br /> Saias</button>
        <button
          onClick={() => {
            const el = document.getElementById("biquinis-praia");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="h-full px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-center text-xs  transition-all duration-100 md:text-sm cursor-pointer"><FaUmbrellaBeach /> Biquinis &<br /> Praia</button>
      </div>



      <Banner1 />



      <div className="container mx-auto shadow-2xl bg-white min-h-screen pt-8 px-4 w-[95%] sm:w-4/5 md:w-4/5 lg:w-2/3">
        {/* Bolsas e Acessórios */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <div id="bolsas-acessorios" className="scroll-mt-24 w-full h-fit mb-5">
            <h1 className="text-center text-[#755f3c] text-5xl underline mb-6">BOLSAS & ACESSÓRIOS</h1>
          </div>
          <InfiniteScroll initialProducts={formatedProducts} category="Bolsas" />
        </div>

        {/* Jogos Americanos */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <div id="jogos-americanos" className="scroll-mt-24 w-full h-fit mb-5">
            <h1 className="text-center text-[#755f3c] text-5xl underline mb-6">JOGOS AMERICANOS</h1>
          </div>
          
          <InfiniteScroll initialProducts={formatedProductsNovidades} category="JogoAmericano" />
        </div>

        {/* Biquinis e Praia */}
        <div className="container mx-auto min-h-screen pt-8 px-4">
          <div id="biquinis-praia" className="scroll-mt-24 w-full h-fit mb-5">
            <h1 className="text-center text-[#755f3c] text-5xl underline mb-6">BIQUÍNIS & PRAIA</h1>
          </div>
          <div className="w-full border-[#ac9f8a] border-[1px] mb-3"><Image 
          alt="Linhas de Biquínis Sobrinha Store" 
          src={bikini1}
          className="w-full px-3 py-3" /></div>
          <InfiniteScroll initialProducts={formatedProductsNovidades} category="Biquini" />
        </div>
      </div>
    </>
  );
}
