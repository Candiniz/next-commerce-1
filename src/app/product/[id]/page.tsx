import AddCart from "@/app/components/AddCart"
import ProductImage from "@/app/components/ProductImage"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import Stripe from "stripe"

type ProductPageProps = {
    params: Promise<{
        id: string;
    }>
}


async function getProduct(id: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-10-28.acacia',
    })
    const produto = await stripe.products.retrieve(id)
    const price = await stripe.prices.list({
        product: produto.id,
    })

    return {
        id: produto.id,
        price: price.data[0].unit_amount,
        name: produto.name,
        image: produto.images[0],
        description: produto.description,
        currency: price.data[0].currency,
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params; // Resolva a Promise antes de acessar 'id'
    const { id } = resolvedParams; // Agora 'id' pode ser acessado corretamente
    const product = await getProduct(id)

    return (
        <div className="animate-fade-zoom flex flex-col bg-white shadow-2xl shadow-pink-900 md:flex-row items-center justify-center w-full md:w-2/3 mx-auto my-10 gap-8 p-10 rounded-2xl">
            {/* Imagem do Produto */}
            <div className="h-[500px] p-5 rounded-lg bg-pink-300 mb-6 md:mb-0 md:w-1/3">
                <ProductImage product={product} />
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col w-full md:w-1/2">
                <div className="pb-4">
                    <h1 className="text-2xl font-bold text-slate-700">{product.name}</h1>
                    <h2 className="text-[3rem] text-pink-500 font-bold">{formatPrice(product.price)}</h2>
                </div>
                <div className="pb-4">
                    <p className="text-sm text-slate-700">{product.description}</p>
                </div>
                <div className="flex flex-col w-full items-center">
                    <AddCart product={product} />
                    <Link href="/" passHref className="border w-full">
                        <button className="mt-4 rounded-md bg-pink-400 text-white p-3.5 py-2.5 text-sm text-center w-full">
                        Voltar
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}
