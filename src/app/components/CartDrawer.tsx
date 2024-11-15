'use client'

import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store"
import Image from "next/image"
import CheckoutButton from "./CheckoutButton"
import Checkout from "./Checkout"
import { motion, AnimatePresence } from "framer-motion"

export default function CartDrawer() {
    const useStore = useCartStore()

    const totalPrice = useStore.cart.reduce((acc, item) => {
        return acc + item.price! * item.quantity!
    }, 0)

    // Definindo a animação de entrada e saída para o carrinho
    const cartAnimation = {
        open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },  // Carrinho aberto
        closed: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }  // Carrinho fechado
    }

    // Animação para a div pai (fundo com opacidade)
    const backdropAnimation = {
        open: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
        closed: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
    }

    return (
        <AnimatePresence
            onExitComplete={() => {
                // Atrasar a alteração do estado para permitir que a animação aconteça
                setTimeout(() => {
                    useStore.toggleCart(); // Só altera o estado após a animação de saída
                }, 300); // Atrasando a troca do estado por 300ms, o mesmo tempo da animação
            }}
        >
            {useStore.isOpen && (  // Verifica se o carrinho está aberto
                <motion.div
                    onClick={() => useStore.toggleCart()} 
                    className="fixed w-full h-screen bg-black/40 left-0 top-0 z-50"
                    variants={backdropAnimation} 
                    initial="closed"
                    animate="open"
                    exit="closed"  // A animação de saída para o fundo
                    transition={{ duration: 0.3 }} // Define o tempo de transição para o fundo
                >
                    {/* Animando o carrinho */}
                    <motion.div
                        onClick={(e) => e.stopPropagation()} 
                        className="absolute bg-slate-600 right-0 top-0 w-auto h-screen p-10 overflow-y-scroll"
                        variants={cartAnimation}         // Usando as animações definidas
                        initial="closed"                // Começa fechado
                        animate="open"                  // Animação de entrada
                        exit="closed"                   // Animação de saída
                        transition={{ duration: 0.3 }}   // Garantindo que a transição do carrinho ocorra corretamente
                    >
                        <button onClick={() => useStore.toggleCart()} className="font-bold text-sm text-pink-500">Voltar para loja</button>
                        <div className="border-t border-gray-400 my-4"></div>

                        {
                            useStore.onCheckout === 'cart' && (
                            <>
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

                                                <div className="flex gap-2 flex-col sm:flex-row">
                                                    <button 
                                                        className="py-1 px-2 border rounded-md mt-2 text-sm" 
                                                        onClick={() => useStore.addProduct(item)} >
                                                        Adicionar
                                                    </button>
                                                    <button
                                                        className="py-1 px-2 border rounded-md mt-2 text-sm"
                                                        onClick={() => useStore.removeProduct(item)} >
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            )
                        }

                        {
                            useStore.cart.length > 0 && useStore.onCheckout === 'cart' && (
                                <CheckoutButton totalPrice={totalPrice} />
                            )
                        }
                        {
                            useStore.onCheckout === 'checkout' && (
                                <Checkout />
                            )
                        }
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
