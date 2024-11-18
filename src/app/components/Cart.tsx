'use client'

import { useCartStore } from "@/store";

import CartDrawer from "./CartDrawer";

export default function Cart() {
    const useStore = useCartStore()






    return(
        <>
            <div onClick={() => useStore.toggleCart()} className="flex items-center cursor-pointer relative">
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
            <span className="bg-pink-400 text-sm text-black font-bold rounded-full h-5 w-5 flex items-center justify-center leading-5 absolute left-4 bottom-3">{useStore.cart?.length}</span>
            </div>

            {
                useStore.isOpen && <CartDrawer />
            }
        </>
    )
}