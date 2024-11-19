'use client'

import { AiOutlineLoading3Quarters } from 'react-icons/ai';


import { useInView } from "react-intersection-observer"
import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import { fetchProducts } from "../actions";

export default function InfiniteScroll({
  initialProducts,
  category,
}: {
  initialProducts: ProductType[];
  category: string;
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true); // Flag para verificar se há mais produtos
  const [isLoading, setIsLoading] = useState<boolean>(false); // Flag para controlar o estado de carregamento

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const lastProductId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    // Verifica se há mais produtos para carregar e se não está carregando
    if (isLoading || !hasMore) return;

    console.log('Iniciando carregamento...');

    setIsLoading(true); // Indica que o carregamento começou

    const { formatedProducts, has_more } = await fetchProducts({
      lastProductId,
      category, // Passando a categoria para filtrar os produtos
    });

    console.log('Produtos recebidos:', formatedProducts);
    console.log('Tem mais produtos:', has_more);

    // Atualiza o estado com os novos produtos
    if (formatedProducts && formatedProducts.length > 0) {
      setProducts((prevProducts) => {
        return [...prevProducts, ...formatedProducts.map(product => ({ ...product, isNew: true }))];
      });
      setHasMore(has_more); // Atualiza a flag de "tem mais produtos"
    } else {
      setHasMore(false); // Se não houver produtos, define que não há mais itens
    }

    setIsLoading(false); // Define que o carregamento terminou
  }, [lastProductId, category, isLoading, hasMore]);

  useEffect(() => {
    // Se estiver visível, e não estiver carregando e tiver mais produtos, carrega mais
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [inView, hasMore, isLoading, loadMoreProducts]);

  // Se não houver produtos carregados, exibe a mensagem de carregamento
  if (!products) return <div>Carregando...</div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} isNew={false} />
        ))}
      </div>

      {/* Condição para exibir a mensagem de carregamento ou de fim de lista */}
      {hasMore ? (
        <>
            <div className="flex w-full justify-center items-center m-auto font-bold text-center my-15" ref={ref}></div>
            <AiOutlineLoading3Quarters className='fill-pink-500 animate-spin h-[100px] w-[100px] mt-10 m-auto' />
        </>
      ) : (
        <div className="w-full border-top border-pink-200 border items-center m-auto font-bold text-center my-8">
          
        </div>
      )}
    </div>
  );
}
