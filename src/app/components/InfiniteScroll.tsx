'use client'

import { useInView } from "react-intersection-observer"
import { ProductType } from "@/types/ProductType";
import { use, useCallback, useEffect, useState } from "react";
import Product from "./Product";
import { fetchProducts } from "../actions";


export default function InfiniteScroll({ initialProducts }: { initialProducts: ProductType[] }) {
    const [products, setProducts] = useState<ProductType[]>(initialProducts);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false
    });

    const lastProductId = products[products.length - 1]?.id;

    const loadMoreProducts = useCallback(async () => {
        setIsLoading(true);
        const { formatedProducts, has_more } = await fetchProducts({ lastProductId });

        if (formatedProducts) {
            setProducts((prevProducts) => {
                return [...prevProducts, ...formatedProducts.map(product => ({ ...product, isNew: true }))];
            });
            setHasMore(has_more);
        }

        setIsLoading(false);
    }, [lastProductId]);

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMoreProducts();
        }
    }, [hasMore, inView, isLoading, loadMoreProducts]);

    if (!products) return <div>Carregando...</div>;

    return (
        <>
            {products.map((product, index) => (
                <Product key={product.id} product={product} isNew={product.isNew || index >= initialProducts.length} />
            ))}

            {hasMore && (
                <div className="flex items-center font-bold" ref={ref}>
                    Carregando mais registros...
                </div>
            )}
        </>
    );
}