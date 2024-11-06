import { ProductType } from "@/types/ProductType"
import Image from "next/image"

type ProductProps = {
    product: ProductType
}

export default function Product( { product } : ProductProps ) {
    return (
        <div className="flex flex-col shadow-lg bg-slate-800 p-3 min-h-full">
            <div className="relative max-h-72 flex-1">
                <Image width={300} height={300} src={product.image} alt={product.title} className="object-contain w-full h-full"  />
            </div>
            <div className="flex justify-between font-bold my-3">{product.title}</div>
            <button className=" mt-auto rounded-md bg-teal-600 text-white p-3.5 py-2.5 tx-sm text-center">Adicionar ao Carrinho</button>
        </div>
    )
}