'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { STORAGE_KEYS } from '@/data/storage';

type FilterValue = 'all' | 'collection' | 'archive';

export default function StorePage() {
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.mode, 'store');
  }, []);

  const visibleProducts = useMemo(() => {
    if (filter === 'collection') {
      return products.filter((product) => !product.archived);
    }

    if (filter === 'archive') {
      return products.filter((product) => product.archived);
    }

    return products;
  }, [filter]);

  const featuredProduct = useMemo(() => {
    const firstActive = visibleProducts.find((product) => !product.archived);
    return firstActive ?? visibleProducts[0];
  }, [visibleProducts]);

  return (
    <main className="page-shell store-page">
      <Header />

      <section className="store-head editorial">
        <div className="filter-row" role="tablist" aria-label="Product filters">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'collection'}
            className={filter === 'collection' ? 'is-active' : ''}
            onClick={() => setFilter('collection')}
          >
            Collection
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'archive'}
            className={filter === 'archive' ? 'is-active' : ''}
            onClick={() => setFilter('archive')}
          >
            Archive
          </button>
        </div>
      </section>

      <section className="store-hero" aria-label="Featured product">
        <h2>Ready-to-Wear For Birthday Delivery</h2>
        <div className="store-hero-stage">
          {featuredProduct ? (
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.name}
              width={760}
              height={880}
              className="store-hero-image"
            />
          ) : null}
        </div>
      </section>

      <section className="catalog-topbar" aria-label="Catalog controls">
        <p>{visibleProducts.length} Products</p>
        <div className="catalog-tools">
          <span>Filter</span>
          <span>Sort By</span>
        </div>
      </section>

      <section className="product-grid" aria-live="polite">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
