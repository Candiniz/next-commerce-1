'use client'

import { useCartStore } from "@/store"
import { ProductType } from "@/types/ProductType"

export default function AddCart({ product }: { product: ProductType }) {
    const { addProduct } = useCartStore()

    return (
        <button
            onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                addProduct(product); 
            }}
            className="w-full mt-auto rounded-md bg-pink-500 text-white p-3.5 py-2.5 tx-sm text-center">
                Adicionar ao Carrinho
        </button>
    )
} 