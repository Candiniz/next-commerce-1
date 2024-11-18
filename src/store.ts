import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from './types/ProductType'

type CartState = {
    cart: ProductType[]
    addProduct: (product: ProductType) => void
    removeProduct: (product: ProductType) => void
    isOpen: boolean
    clearCart: () => void
    toggleCart: () => void
    onCheckout: string
    setCheckout: (checkout: string) => void
    paymentIntent: string
    setPaymentIntent: (paymentIntent: string) => void
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],

        addProduct: (item) => set((state) => {
            const existingProduct = state.cart.find((p) => p.id === item.id); // Verificando se o produto já existe no carrinho
            if (existingProduct) { // Se o produto já existe, atualiza a quantidade
                const updatedCart = state.cart.map((p) => {
                    if (p.id === item.id) {
                        return { ...p, quantity: (p.quantity || 0) + 1 }; // Incrementa a quantidade
                    }
                    return p; // Se não for o produto que estamos atualizando, retorna o produto sem modificações
                });
                return { cart: updatedCart }; // Retorna o carrinho atualizado
            } else { // Se o produto não existir no carrinho, adiciona ele com quantidade 1
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }
        }),

        removeProduct: (item) => set((state) => {
            const existingProduct = state.cart.find((p) => p.id === item.id); // Verificando se o produto já existe no carrinho
            if (existingProduct && existingProduct.quantity! > 1) {
                const updatedCart = state.cart.map((p) => {
                    if (p.id === item.id) {
                        return { ...p, quantity: p.quantity! - 1 }
                    }
                    return p
                })
                return { cart: updatedCart }
            } else {
                const filteredCart = state.cart.filter((p) => p.id !== item.id) // Todos os itens que foram diferentes de 'item.id'
                return { cart: filteredCart } // Nesse caso, 'item.id' é o item removido, e ele retorna todos os outros
            }
        }),

        isOpen: false,

        // Função para alternar o estado do carrinho com animação de saída
        toggleCart: () => set((state) => {
            if (state.isOpen) {
                set({ isOpen: false });
                return { isOpen: false }; // fecha o carrinho
            } else {
                return { isOpen: true }; // abre o carrinho
            }
        }),

        onCheckout: 'cart',
        setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
        paymentIntent: '',
        setPaymentIntent: (paymentIntent: string) => set(() => ({ paymentIntent })),
        clearCart: () => set(() => ({ cart: [] })),
    }), 
    { name: 'cart-storage' }
));
