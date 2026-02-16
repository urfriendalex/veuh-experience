'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from '@/components/ThemeToggle';

type HeaderProps = {
  showNavigation?: boolean;
};

export function Header({ showNavigation = true }: HeaderProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();

  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Go to homepage">
        VEUH STUDIO
      </Link>

      {showNavigation ? (
        <nav className="site-nav" aria-label="Primary">
          <span className="nav-ghost">Spring 26</span>
          <span className="nav-ghost">Gifts</span>
          <Link href="/store" className={pathname?.startsWith('/store') ? 'is-active' : ''}>
            Ready-to-Wear
          </Link>
          <Link
            href="/experience"
            className={pathname?.startsWith('/experience') ? 'is-active' : ''}
          >
            Experience
          </Link>
          <span className="nav-ghost">Explore</span>
        </nav>
      ) : null}

      <div className="site-actions">
        <ThemeToggle compact />
        <button type="button" className="cart-button" onClick={openCart} aria-label="Open cart">
          Cart
          <span>{count}</span>
        </button>
      </div>
    </header>
  );
}
