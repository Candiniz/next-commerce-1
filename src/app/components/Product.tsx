import { ProductType } from "@/types/ProductType"
import ProductImage from "./ProductImage"
import { formatPrice } from "@/lib/utils"
import AddCart from "./AddCart"
import Link from "next/link"

type ProductProps = {
    product: ProductType
}

export default function Product({ product }: ProductProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="flex flex-col shadow-lg h-auto bg-slate-800 p-5 rounded-lg">
                <div className="relative h-auto flex-1"> 
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
