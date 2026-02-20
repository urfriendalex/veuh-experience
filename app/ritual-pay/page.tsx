'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { STORAGE_KEYS } from '@/data/storage';

export default function RitualPayPage() {
  const router = useRouter();
  const { clearCart, resetOrderState, closeCheckout } = useCart();
  const { setTheme } = useTheme();

  const handlePay = useCallback(() => {
    clearCart();
    resetOrderState();
    closeCheckout();
    setTheme('default');
    window.localStorage.setItem(STORAGE_KEYS.mode, 'store');
    router.push('/store');
  }, [clearCart, resetOrderState, closeCheckout, setTheme, router]);

  return (
    <main className="ritual-pay-page">
      <div className="ritual-pay-glow" aria-hidden />
      <div className="ritual-pay-shell">
        <header className="ritual-pay-top">
          <div>
            <h1>Alexander Y</h1>
            <p>How much do you want to send?</p>
          </div>
          <p className="ritual-pay-brand">Revolut</p>
          <div className="ritual-pay-avatar" aria-label="AY profile">
            <span>AY</span>
            <i>R</i>
          </div>
        </header>

        <section className="ritual-pay-center">
          <h2>US$20</h2>
          <button type="button" className="ritual-pay-currency" aria-label="Currency">
            <span>🇺🇸</span>
            <span>USD</span>
            <span className="ritual-pay-caret">⌄</span>
          </button>
        </section>

        <section className="ritual-pay-note">
          <div className="ritual-pay-note-top">
            <span>Note</span>
            <span className="ritual-pay-gif">GIF</span>
          </div>
          <p>ЗА САЙТ</p>
          <p className="ritual-pay-count">57 / 64</p>
        </section>

        <section className="ritual-pay-methods">
          <p className="ritual-pay-methods-title">How to pay</p>
          <div className="ritual-pay-method-list">
            <button type="button" className="ritual-pay-method">
              <span className="ritual-pay-method-icon">R</span>
              <span>Revolut</span>
              <span className="ritual-pay-arrow">›</span>
            </button>
            <button type="button" className="ritual-pay-method">
              <span className="ritual-pay-method-icon">💳</span>
              <span>Debit or credit card</span>
              <span className="ritual-pay-arrow">›</span>
            </button>
            <button type="button" className="ritual-pay-method">
              <span className="ritual-pay-method-icon"></span>
              <span>Apple Pay</span>
              <span className="ritual-pay-arrow">›</span>
            </button>
          </div>
        </section>

        <div className="ritual-pay-action">
          <button type="button" className="ritual-pay-submit" onClick={handlePay}>
            PAY
          </button>
        </div>

        <footer className="ritual-pay-foot">
          <p className="ritual-pay-language">🇬🇧 English ⌄</p>
          <p>Payments you make are processed by your payment account provider</p>
          <p>
            Learn how we handle your data in our <a href="#">Customer Privacy Notice</a>
          </p>
          <p>
            Revolut Ltd is a company registered in England and Wales (No. 08804411). Revolut Ltd is
            authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011,
            Firm Reference 900562.
          </p>
        </footer>
      </div>
    </main>
  );
}
