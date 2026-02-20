'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { ProductGallery } from '@/components/ProductGallery';
import { products } from '@/data/products';
import { STORAGE_KEYS } from '@/data/storage';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

type ExperienceStep = number;

export default function ExperiencePage() {
  const [step, setStep] = useState<ExperienceStep>(-1);
  const [gateMessage, setGateMessage] = useState('');
  const [isRitualReady, setRitualReady] = useState(false);
  const { addToCart, isInCart, openCheckout } = useCart();
  const { theme, setTheme } = useTheme();
  const collectionProducts = useMemo(() => products.filter((product) => !product.archived), []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.mode, 'experience');

    if (window.localStorage.getItem(STORAGE_KEYS.vikingGatePassed) === 'true') {
      collectionProducts.forEach((product) => addToCart(product));
      openCheckout('ritual');
      setRitualReady(true);
      setStep(collectionProducts.length + 1);
      window.localStorage.removeItem(STORAGE_KEYS.vikingGatePassed);
    }
  }, [addToCart, openCheckout, collectionProducts]);

  useEffect(() => {
    if (theme === 'viking') {
      setGateMessage('');
    }
  }, [theme]);

  const progress = useMemo(() => {
    if (step < 0) {
      return 0;
    }

    if (step >= collectionProducts.length) {
      return collectionProducts.length;
    }

    return step + 1;
  }, [step, collectionProducts.length]);

  const currentProduct = step >= 0 && step < collectionProducts.length ? collectionProducts[step] : null;

  if (step === -1) {
    return (
      <main className="page-shell experience-shell immersive">
        <Header />

        <section className="experience-panel intro fullscreen-entry">
          <p className="product-kicker">Experience Mode</p>
          <h1>Guided collection reveal</h1>
          <p>
            Move through all {collectionProducts.length} new collection pieces. Each step unlocks only
            after the current piece is added to cart.
          </p>

          <div className="viking-mechanics-panel" role="note" aria-label="Viking mode mechanics">
            <h3>Viking mode mechanics</h3>
            <p>Item copy changes in Viking mode, and the final refresh checkpoint only unlocks in Viking.</p>
            {theme === 'viking' ? (
              <p className="viking-mechanics-status">Viking mode is currently active.</p>
            ) : (
              <button type="button" className="button" onClick={() => setTheme('viking')}>
                Enable Viking mode now
              </button>
            )}
          </div>

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
    const description =
      theme === 'viking'
        ? currentProduct.vikingNarrative ?? currentProduct.vikingDescription ?? currentProduct.narrative
        : currentProduct.narrative;

    return (
      <main className="page-shell experience-shell immersive">
        <Header />

        <section className="experience-panel fullscreen">
          <div className="experience-progress">
            <span>
              {progress}/{collectionProducts.length}
            </span>
            <div className="progress-track">
              <i style={{ width: `${(progress / collectionProducts.length) * 100}%` }} />
            </div>
          </div>

          <div className="experience-card">
            <ProductGallery
              product={currentProduct}
              width={900}
              height={900}
              frameClassName="experience-image-wrap"
              imageClassName="experience-image"
              variant="experience"
              priority
            />

            <div className="experience-copy">
              <p className="product-kicker">New Collection · {currentProduct.category}</p>
              <h2>{currentProduct.name}</h2>
              <p className="experience-description-variant">
                {theme === 'viking' ? 'Viking Item Description' : 'Item Description'}
              </p>
              <p>{description}</p>
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
                  onClick={() => setStep((current) => current + 1)}
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

  if (step === collectionProducts.length) {
    const handleRefreshGate = () => {
      if (theme !== 'viking') {
        setGateMessage('Refresh blocked. Switch to Viking mode first.');
        return;
      }

      window.localStorage.setItem(STORAGE_KEYS.vikingGatePassed, 'true');
      window.location.reload();
    };

    return (
      <main className="page-shell">
        <Header />

        <section className="experience-panel summary viking-gate-panel">
          <p className="product-kicker">System Checkpoint</p>
          <h1>Oops, something went wrong.</h1>
          <p>Switch to Viking mode and reload the page to continue.</p>

          <div className="viking-oops-card">
            <p className="viking-oops-code">Error: RITUAL_SYNC_ABORTED</p>
            <p className="viking-oops-help">Refresh only works while Viking mode is active.</p>
            <button type="button" className="button checkout-pay-button viking-refresh-button" onClick={handleRefreshGate}>
              Refresh Page
            </button>
          </div>

          {gateMessage ? (
            <p className="viking-gate-warning" role="status">
              {gateMessage}
            </p>
          ) : null}

          <div className="summary-actions">
            {theme === 'viking' ? null : (
              <button type="button" className="button" onClick={() => setTheme('viking')}>
                Switch to Viking mode
              </button>
            )}
            <Link href="/store" className="button ghost">
              Browse store mode
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <Header />

      <section className="experience-panel summary">
        <p className="product-kicker">Ritual Checkout</p>
        <h1>All items were added to your cart.</h1>
        <p>Checkout is ready with the final $20 payment step.</p>
        <div className="summary-actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              collectionProducts.forEach((product) => addToCart(product));
              openCheckout('ritual');
              setRitualReady(true);
            }}
          >
            {isRitualReady ? 'Open checkout again' : 'Open checkout'}
          </button>
          <Link href="/store" className="button ghost">
            Go to store
          </Link>
        </div>
      </section>
    </main>
  );
}
