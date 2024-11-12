'use client'

import { useState } from 'react'
import Image from 'next/image';
import {ProductType} from '../../types/ProductType';

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage( { product }: ProductImageProps ) {

    const [loading, setLoading] = useState(true);

    return (
        <Image 
            src={product.image} 
            width={400}
            height={700}
            alt={product.name} 
            className={`object-cover ${ loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0' }`} 
            onLoad={() => setLoading(false)} 
        />
    );
}