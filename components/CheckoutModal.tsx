'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

const defaultForm = {
  name: 'Birthday Receiver',
  address: '44 Northern Light Avenue, Reykjavik',
  email: 'birthday-guest@example.com'
};

function Confetti() {
  const strips = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  return (
    <div className="confetti" aria-hidden>
      {strips.map((item) => (
        <span key={item} style={{ ['--i' as string]: item }} />
      ))}
    </div>
  );
}

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    placeOrder,
    orderPlaced,
    count,
    subtotal,
    resetOrderState
  } = useCart();
  const [form, setForm] = useState(defaultForm);

  const handleClose = () => {
    closeCheckout();
    if (orderPlaced) {
      resetOrderState();
    }
  };

  const handlePlaceOrder = () => {
    placeOrder();
  };

  return (
    <>
      <div className={`overlay ${isCheckoutOpen ? 'is-visible' : ''}`.trim()} onClick={handleClose} />
      <section className={`checkout-modal ${isCheckoutOpen ? 'is-open' : ''}`.trim()} aria-hidden={!isCheckoutOpen}>
        {!orderPlaced ? (
          <>
            <header>
              <h2>Checkout</h2>
              <button type="button" className="icon-button" onClick={handleClose}>
                Close
              </button>
            </header>

            <p className="checkout-note">All fields are pre-filled for the birthday handoff.</p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handlePlaceOrder();
              }}
            >
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />

              <label htmlFor="address">Address</label>
              <input
                id="address"
                value={form.address}
                onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />

              <div className="checkout-summary">
                <span>{count} items ready</span>
                <strong>Total: ${subtotal}</strong>
              </div>

              <button type="submit" className="button" disabled={count === 0}>
                Place order
              </button>
            </form>
          </>
        ) : (
          <div className="confirmation">
            <Confetti />
            <p className="product-kicker">Order confirmed</p>
            <h2>Happy Birthday.</h2>
            <p>
              Your full collection is now marked as delivered. The real items are waiting for you right
              now.
            </p>
            <button type="button" className="button" onClick={handleClose}>
              Finish
            </button>
          </div>
        )}
      </section>
    </>
  );
}
