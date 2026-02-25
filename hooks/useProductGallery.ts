'use client';

import { useMemo } from 'react';
import { getProductImagesFromImageField, type Product } from '@/data/products';

export function useProductGallery(product: Product) {
  const imageFieldEntries = useMemo(() => getProductImagesFromImageField(product.image), [product.image]);
  const declaredGallery = useMemo(() => product.gallery?.filter((src) => src.trim().length > 0) ?? [], [product.gallery]);

  return useMemo(() => {
    if (imageFieldEntries.length > 1 || Array.isArray(product.image)) {
      return imageFieldEntries;
    }

    if (declaredGallery.length > 0) {
      return declaredGallery;
    }

    return imageFieldEntries;
  }, [declaredGallery, imageFieldEntries, product.image]);
}
