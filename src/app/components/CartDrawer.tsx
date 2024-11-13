'use client'

import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store"
import Image from "next/image"

export default function CartDrawer() {
    const useStore = useCartStore()

    return(
        <div onClick={() => useStore.toogleCart()} className="fixed w-full h-screen bg-black/40 left-0 top-0 z-50">
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="absolute border border-fuchsia-600 bg-slate-600 right-0 top-0 w-auto h-screen p-10 overflow-y-scroll"
            >
                <button onClick={() => useStore.toogleCart()} className="font-bold text-sm text-pink-500">Voltar para loja</button>
                <div className="border-t border-gray-400 my-4"></div>

                {
                    useStore.cart.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4">
                            <Image 
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="object-cover w-24"
                            />
                            <div className="flex flex-col gap-2">
                                <h2 className="max-w-full break-words">{item.name}</h2>
                                <h2 className="break-words">Quantidade: {item.quantity}</h2>
                                <p className="text-pink-500 text-lg font-bold">{formatPrice(item.price)}</p>

                                {/* Botões: flex-row no caso de telas menores e flex-col em telas maiores */}
                                <div className="flex gap-2 flex-col sm:flex-row">
                                    <button 
                                        className="py-1 px-2 border rounded-md mt-2 text-sm" 
                                        onClick={() => useStore.addProduct(item)}>
                                        Adicionar
                                    </button>
                                    <button
                                        className="py-1 px-2 border rounded-md mt-2 text-sm"
                                        onClick={() => useStore.removeProduct(item)}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
