'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { activeProducts } from '@/data/products';
import { STORAGE_KEYS } from '@/data/storage';
import { useCart } from '@/context/CartContext';

type ExperienceStep = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export default function ExperiencePage() {
  const [step, setStep] = useState<ExperienceStep>(-1);
  const [cartOpenedOnce, setCartOpenedOnce] = useState(false);
  const { addToCart, isInCart, openCart } = useCart();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.mode, 'experience');
  }, []);

  const progress = useMemo(() => {
    if (step < 0) {
      return 0;
    }

    if (step >= activeProducts.length) {
      return activeProducts.length;
    }

    return step + 1;
  }, [step]);

  useEffect(() => {
    if (step === activeProducts.length && !cartOpenedOnce) {
      openCart();
      setCartOpenedOnce(true);
    }
  }, [step, openCart, cartOpenedOnce]);

  const currentProduct = step >= 0 && step < activeProducts.length ? activeProducts[step] : null;

  if (step === -1) {
    return (
      <main className="page-shell experience-shell immersive">
        <Header />

        <section className="experience-panel intro fullscreen-entry">
          <p className="product-kicker">Experience Mode</p>
          <h1>Guided collection reveal</h1>
          <p>
            Move through all five main pieces. Each step unlocks only after the current piece is added to
            cart.
          </p>

          <div className="entry-actions">
            <button type="button" className="button" onClick={() => setStep(0)}>
              Begin collection walk
            </button>
            <Link href="/store" className="button ghost">
              Browse store mode
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (currentProduct) {
    const alreadyAdded = isInCart(currentProduct.id);

    return (
      <main className="page-shell experience-shell immersive">
        <Header />

        <section className="experience-panel fullscreen">
          <div className="experience-progress">
            <span>
              {progress}/{activeProducts.length}
            </span>
            <div className="progress-track">
              <i style={{ width: `${(progress / activeProducts.length) * 100}%` }} />
            </div>
          </div>

          <div className="experience-card">
            <div className="experience-image-wrap">
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                width={900}
                height={900}
                className="experience-image"
              />
            </div>

            <div className="experience-copy">
              <p className="product-kicker">{currentProduct.category}</p>
              <h2>{currentProduct.name}</h2>
              <p>{currentProduct.narrative}</p>
              <p className="product-size">Size: {currentProduct.size}</p>
              <div className="experience-actions">
                <button
                  type="button"
                  className={`button ${alreadyAdded ? 'is-added' : ''}`.trim()}
                  onClick={() => addToCart(currentProduct)}
                >
                  {alreadyAdded ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className="button ghost"
                  onClick={() => setStep((current) => (current + 1) as ExperienceStep)}
                  disabled={!alreadyAdded}
                >
                  {alreadyAdded ? 'Next piece' : 'Add to cart to continue'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const completedCount = activeProducts.filter((product) => isInCart(product.id)).length;

  return (
    <main className="page-shell">
      <Header />

      <section className="experience-panel summary">
        <p className="product-kicker">Collection Complete</p>
        <h1>The cart is open and ready.</h1>
        <p>
          You added {completedCount} of {activeProducts.length} main pieces. Complete checkout to reveal the
          birthday delivery message.
        </p>

        <div className="summary-actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              activeProducts.forEach((product) => addToCart(product));
              openCart();
            }}
          >
            Add remaining + open cart
          </button>
          <Link href="/store" className="button ghost">
            Browse in store mode
          </Link>
        </div>
      </section>
    </main>
  );
}
