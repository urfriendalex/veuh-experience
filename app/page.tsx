'use client';

import Link from 'next/link';
import { STORAGE_KEYS } from '@/data/storage';

function persistMode(mode: 'store' | 'experience') {
  window.localStorage.setItem(STORAGE_KEYS.mode, mode);
}

export default function HomePage() {
  return (
    <main className="entry-stage">
      <section className="entry-hero fullscreen-entry">
        <p className="product-kicker">Birthday Collection</p>
        <h1>Choose your way in.</h1>
        <p>
          Launch straight into the store or start a guided walkthrough that builds the full gift cart for
          you.
        </p>

        <div className="entry-actions">
          <Link href="/store" className="button" onClick={() => persistMode('store')}>
            Enter Store
          </Link>
          <Link href="/experience" className="button ghost" onClick={() => persistMode('experience')}>
            Start the Experience
          </Link>
        </div>
      </section>
    </main>
  );
}
