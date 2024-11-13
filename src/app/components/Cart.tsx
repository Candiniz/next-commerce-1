'use client'

import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import CartDrawer from "./CartDrawer";

export default function Cart() {
    const useStore = useCartStore()


    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento

    useEffect(() => {
        // Esse efeito é executado após o carregamento da página
        const timeout = setTimeout(() => {
            setIsLoading(false); // Após o carregamento, permite mostrar o carrinho
        }, 1000); // Definindo um pequeno delay para garantir o carregamento completo

        return () => clearTimeout(timeout);
    }, []);

    // Não mostra o carrinho enquanto está carregando
    if (isLoading) {
        return null; // Ou algum outro tipo de placeholder, se preferir
    }

    return(
        <>
            <div onClick={() => useStore.toogleCart()} className="flex items-center cursor-pointer relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
                viewBox="0 0 24 24"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l1.68 8.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="bg-black text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center leading-5 absolute left-4 bottom-3">{useStore.cart?.length}</span>
            </div>

            {
                !useStore.isOpen && <CartDrawer />
            }
        </>
    )
}