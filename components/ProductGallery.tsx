'use client';

import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { getPrimaryProductImage, type Product } from '@/data/products';
import { useProductGallery } from '@/hooks/useProductGallery';

type ProductGalleryProps = {
  product: Product;
  width: number;
  height: number;
  imageClassName: string;
  frameClassName: string;
  variant: 'product-card' | 'experience';
  priority?: boolean;
  children?: ReactNode;
};

export function ProductGallery({
  product,
  width,
  height,
  imageClassName,
  frameClassName,
  variant,
  priority = false,
  children
}: ProductGalleryProps) {
  const gallery = useProductGallery(product);
  const [index, setIndex] = useState(0);
  const hasGalleryControls = gallery.length > 1;

  useEffect(() => {
    setIndex(0);
  }, [product.id, gallery.length]);

  const fallbackImage = getPrimaryProductImage(product);
  const activeImage = gallery[index] ?? fallbackImage;

  return (
    <div className={`${frameClassName} gallery-frame gallery-frame-${variant}`.trim()}>
      <Image
        src={activeImage}
        alt={`${product.name}${hasGalleryControls ? ` view ${index + 1}` : ''}`}
        width={width}
        height={height}
        className={imageClassName}
        priority={priority}
      />

      {hasGalleryControls ? (
        <>
          <button
            type="button"
            className="gallery-nav gallery-nav-prev"
            aria-label={`Show previous photo for ${product.name}`}
            onClick={() => setIndex((current) => (current - 1 + gallery.length) % gallery.length)}
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-nav gallery-nav-next"
            aria-label={`Show next photo for ${product.name}`}
            onClick={() => setIndex((current) => (current + 1) % gallery.length)}
          >
            ›
          </button>

          <div className="gallery-dots" role="tablist" aria-label={`${product.name} gallery`}>
            {gallery.map((item, itemIndex) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                className={`gallery-dot ${itemIndex === index ? 'is-active' : ''}`.trim()}
                aria-label={`Show photo ${itemIndex + 1} of ${gallery.length} for ${product.name}`}
                onClick={() => setIndex(itemIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
      {children}
    </div>
  );
}
