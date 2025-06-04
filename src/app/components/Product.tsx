import { ProductType } from "@/types/ProductType"
import ProductImage from "./ProductImage"
import { formatPrice } from "@/lib/utils"
import AddCart from "./AddCart"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

type ProductProps = {
    product: ProductType;
    isNew: boolean; // Adiciona uma propriedade que indica se o produto é novo
}

export default function Product({ product }: ProductProps) {
    const [isMounted, setIsMounted] = useState(false);
    const productRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsMounted(true);
                }
            },
            { threshold: 0.5 } // Configura para ativar a animação quando 50% do item for visível
        );

        if (productRef.current) {
            observer.observe(productRef.current);
        }

        return () => {
            if (productRef.current) {
                observer.unobserve(productRef.current);
            }
        };
    }, []);

    return (
        <Link href={`/product/${product.id}`}>
            <div
                ref={productRef} // Refere-se ao elemento para monitoramento
                className={`flex flex-col border-[#ac9f8a] border-[1px] h-[550px] p-5 
                    transition-all duration-1000 ease-out w-full 
                    ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
                    transform
                    hover:scale-102 hover:transition-transform`}
            >
                <div className="relative h-auto flex-1 overflow-hidden">
                    <ProductImage product={product} fill />
                </div>
                <div className="flex flex-col justify-between font-bold my-3">
                    <p className="font-semibold max-w-full text-gray-700 text-sm sm:text-base">{product.name}</p>
                    <p className="text-xl text-pink-500 mt-2">{formatPrice(product.price)}</p>
                </div>
                <AddCart product={product} />
            </div>
        </Link>
    );
}
