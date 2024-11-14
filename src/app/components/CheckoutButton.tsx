import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ totalPrice }: { totalPrice: number } ) {

    const router = useRouter()
    const { user } = useUser()
    const cartStore = useCartStore()

    const handleCheckout = async () => {
        if (!user) {
            cartStore.toogleCart()
            router.push('sign-in')
            return
        }
        cartStore.setCheckout('checkout')
    }

    return (
        <div className="my-4">
            <p className="text-pink-400 font-bold">Total: {formatPrice(totalPrice)}</p>
            <button 
                onClick={handleCheckout}
                className="w-full rounded-md bg-pink-400 text-black py-2"
            >
                Finalizar Compra
            </button>
        </div>
    )
}