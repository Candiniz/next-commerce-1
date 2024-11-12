import { ProductType } from "@/types/ProductType"
import ProductImage from "./ProductImage"
import { formatPrice } from "@/lib/utils"

type ProductProps = {
    product: ProductType
}

export default function Product( { product } : ProductProps ) {
    return (
        <div className="flex flex-col shadow-lg h-auto bg-slate-800 p-5 rounded-lg">
            <div className="relative h-auto flex-1"> 
                <ProductImage product={product} fill /> 
            </div>
            <div className="flex justify-between font-bold my-3"> 
                <p className="w-40 truncate">{product.name}</p> 
                <p className="text-md text-teal-300">{formatPrice(product.price)}</p>    
            </div>
            <button className=" mt-auto rounded-md bg-pink-500 text-white p-3.5 py-2.5 tx-sm text-center">Adicionar ao Carrinho</button>
        </div>
    )
}