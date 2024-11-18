'use client'

import { useCartStore } from "@/store"
import { useEffect } from "react"

export default function OrderCompleted() {

    const cartStore = useCartStore()
    useEffect(() => {
        cartStore.setPaymentIntent("")
        cartStore.clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>Pedido Concluido!</h1>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-md" 
                onClick={() => {
                    setTimeout(() => {
                        cartStore.setCheckout("cart")
                    }, 1000)
                    cartStore.toggleCart()
                }}>
                    Clique para voltar
            </button>
        </>
    )
}