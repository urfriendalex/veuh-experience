'use client';

import { useEffect, useMemo, useState } from 'react';
import { getProductImagesFromImageField, type Product } from '@/data/products';

const IMAGE_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'svg'] as const;
const MAX_GALLERY_ITEMS = 12;
const galleryCache = new Map<string, string[]>();

function probeImage(src: string) {
  return new Promise<boolean>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

async function resolveGalleryImage(productId: string, index: number) {
  for (const extension of IMAGE_EXTENSIONS) {
    const src = `/products/${productId}/${index}.${extension}`;
    const exists = await probeImage(src);
    if (exists) {
      return src;
    }
  }

  return null;
}

async function discoverGallery(productId: string) {
  const discovered: string[] = [];

  for (let index = 1; index <= MAX_GALLERY_ITEMS; index += 1) {
    const src = await resolveGalleryImage(productId, index);
    if (!src) {
      break;
    }
    discovered.push(src);
  }

  return discovered;
}

export function useProductGallery(product: Product) {
  const imageFieldEntries = useMemo(
    () => getProductImagesFromImageField(product.image),
    [product.image]
  );
  const isExplicitImageArray = Array.isArray(product.image);
  const declaredGallery = useMemo(
    () => product.gallery?.filter((src) => src.trim().length > 0) ?? [],
    [product.gallery]
  );
  const [images, setImages] = useState<string[]>(() => {
    if (imageFieldEntries.length > 0) {
      return imageFieldEntries;
    }

    return declaredGallery;
  });

  useEffect(() => {
    if (imageFieldEntries.length > 0 && isExplicitImageArray) {
      setImages(imageFieldEntries);
      return;
    }

    if (imageFieldEntries.length === 0 && declaredGallery.length > 0) {
      setImages(declaredGallery);
      return;
    }

    const baseImage = imageFieldEntries[0] ?? '';
    if (baseImage.length === 0) {
      setImages([]);
      return;
    }

    const cacheKey = `${product.id}:${baseImage}`;
    const cached = galleryCache.get(cacheKey);

    if (cached) {
      setImages(cached);
      return;
    }

    let isCancelled = false;

    const resolve = async () => {
      const discovered = await discoverGallery(product.id);
      const resolved = discovered.length > 0 ? discovered : [baseImage];
      galleryCache.set(cacheKey, resolved);

      if (!isCancelled) {
        setImages(resolved);
      }
    };

    void resolve();

    return () => {
      isCancelled = true;
    };
  }, [declaredGallery, imageFieldEntries, isExplicitImageArray, product.id]);

  return images;
}
