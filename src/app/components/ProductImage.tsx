'use client'

import { useState } from 'react'
import Image from 'next/image';
import {ProductType} from '../../types/ProductType';

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
    className?: string;
}

export default function ProductImage( { product }: ProductImageProps ) {

    const [loading, setLoading] = useState(true);

    return (
        <Image 
            src={product.image} 
            width={400}
            height={600}
            alt={product.name}
            className={` object-bottom object-cover w-full h-full  ${ loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0' }`} 
            onLoad={() => setLoading(false)} 
        />
    );
}