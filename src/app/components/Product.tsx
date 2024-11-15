import { ProductType } from "@/types/ProductType"
import ProductImage from "./ProductImage"
import { formatPrice } from "@/lib/utils"
import AddCart from "./AddCart"
import Link from "next/link"
import { useEffect, useState } from "react"

type ProductProps = {
    product: ProductType;
    isNew: boolean; // Adiciona uma propriedade que indica se o produto é novo
}

export default function Product({ product, isNew }: ProductProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isNew) {
            setTimeout(() => setIsMounted(true), 100); // Adiciona um pequeno delay para a animação
        } else {
            setIsMounted(true);
        }
    }, [isNew]);

    return (
        <Link href={`/product/${product.id}`}>
            <div
                className={`flex flex-col shadow-lg h-[550px] bg-slate-800 p-5 rounded-lg 
                transition-all duration-1000 ease-out 
                ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
                transform
                hover:scale-102 hover:transition-transform`}
            >
                <div className="relative h-auto flex-1 overflow-hidden">
                    <ProductImage product={product} fill />
                </div>
                <div className="flex flex-col justify-between font-bold my-3">
                    <p className="text-base font-semibold max-w-full">{product.name}</p>
                    <p className="text-xl text-teal-300 mt-2">{formatPrice(product.price)}</p>
                </div>
                <AddCart product={product} />
            </div>
        </Link>
    )
}
