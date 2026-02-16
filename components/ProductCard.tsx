'use client';

import Image from 'next/image';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const alreadyAdded = isInCart(product.id);

  return (
    <article className={`product-card ${product.archived ? 'is-archived' : ''}`.trim()}>
      <div className="product-image-wrap">
        <Image src={product.image} alt={product.name} width={640} height={760} className="product-image" />
        {product.archived ? <span className="product-badge">Archived</span> : null}
      </div>

      <div className="product-meta">
        <div>
          <p className="product-kicker">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <p className="product-price">${product.price}</p>
      </div>

      <p className="product-description">{product.description}</p>
      <p className="product-size">Size: {product.size}</p>

      {product.archived ? (
        <button type="button" className="button ghost" disabled>
          Archive only
        </button>
      ) : (
        <button
          type="button"
          className={`button ${alreadyAdded ? 'is-added' : ''}`.trim()}
          onClick={() => addToCart(product)}
        >
          {alreadyAdded ? 'Added' : 'Add to cart'}
        </button>
      )}
    </article>
  );
}
