'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from '@/components/ThemeToggle';

type HeaderProps = {
  showNavigation?: boolean;
};

export function Header({ showNavigation = true }: HeaderProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileNavOpen) {
      document.body.classList.remove('is-mobile-nav-open');
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };

    document.body.classList.add('is-mobile-nav-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-mobile-nav-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="logo" aria-label="Go to homepage">
          VEUH STUDIO
        </Link>

        {showNavigation ? (
          <nav className="site-nav site-nav-desktop" aria-label="Primary">
            <span className="nav-ghost">Spring 26</span>
            <span className="nav-ghost">Gifts</span>
            <Link
              href="/store"
              className={pathname?.startsWith('/store') ? 'is-active' : ''}
            >
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
          {showNavigation ? (
            <button
              type="button"
              className={`icon-button mobile-nav-toggle ${isMobileNavOpen ? 'is-open' : ''}`.trim()}
              aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-site-nav"
              aria-expanded={isMobileNavOpen}
              onClick={() => setMobileNavOpen((current) => !current)}
            >
              {isMobileNavOpen ? 'Close' : 'Menu'}
            </button>
          ) : null}
          <ThemeToggle compact />
          <button type="button" className="cart-button" onClick={openCart} aria-label="Open cart">
            Cart
            <span>{count}</span>
          </button>
        </div>
      </header>

      {showNavigation ? (
        <>
          <nav
            className={`site-nav mobile-nav-drawer ${isMobileNavOpen ? 'is-mobile-open' : ''}`.trim()}
            aria-label="Primary"
            id="mobile-site-nav"
          >
            <div className="mobile-nav-head">
              <p>Navigation</p>
              <button
                type="button"
                className="icon-button mobile-nav-close"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
              >
                Close
              </button>
              <ThemeToggle compact />
            </div>
            <span className="nav-ghost">Spring 26</span>
            <span className="nav-ghost">Gifts</span>
            <Link
              href="/store"
              className={pathname?.startsWith('/store') ? 'is-active' : ''}
              onClick={() => setMobileNavOpen(false)}
            >
              Ready-to-Wear
            </Link>
            <Link
              href="/experience"
              className={pathname?.startsWith('/experience') ? 'is-active' : ''}
              onClick={() => setMobileNavOpen(false)}
            >
              Experience
            </Link>
            <span className="nav-ghost">Explore</span>
          </nav>

          <button
            type="button"
            className={`mobile-nav-backdrop ${isMobileNavOpen ? 'is-visible' : ''}`.trim()}
            onClick={() => setMobileNavOpen(false)}
            aria-hidden={!isMobileNavOpen}
            tabIndex={isMobileNavOpen ? 0 : -1}
          />
        </>
      ) : null}
    </>
  );
}
