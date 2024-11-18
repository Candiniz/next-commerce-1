'use server'

import { stripe } from '@/lib/stripe'

export async function fetchProducts({
  lastProductId,
  category,
}: {
  lastProductId?: string;
  category?: string;
}) {
  const params = lastProductId ? { starting_after: lastProductId, limit: 4 } : { limit: 4 };

  const { data: products, has_more } = await stripe.products.list(params);

  // Filtrar os produtos pela categoria, se fornecida
  const filteredProducts = category
      ? products.filter(product => product.metadata.Categoria === category)
      : products;

  const formatedProducts = await Promise.all(
      filteredProducts.map(async (product) => {
          const price = await stripe.prices.list({
              product: product.id,
          });
          return {
              id: product.id,
              price: price.data[0].unit_amount,
              name: product.name,
              image: product.images[0],
              description: product.description,
              currency: price.data[0].currency,
              category: product.metadata.Categoria || 'Outros',
          };
      })
  );

  return { formatedProducts, has_more };
}
