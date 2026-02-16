'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    openCheckout
  } = useCart();

  return (
    <>
      <div className={`overlay ${isCartOpen ? 'is-visible' : ''}`.trim()} onClick={closeCart} />
      <aside
        className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`.trim()}
        aria-hidden={!isCartOpen}
        aria-label="Cart drawer"
      >
        <div className="cart-head">
          <h2>Cart ({count})</h2>
          <button type="button" className="icon-button" onClick={closeCart}>
            Close
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <p className="cart-empty">No items yet. Add pieces from Store or Experience mode.</p>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="cart-thumb" />
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>

          <div className="cart-foot-actions">
            <button type="button" className="button ghost" onClick={clearCart} disabled={count === 0}>
              Clear
            </button>
            <button
              type="button"
              className="button"
              onClick={openCheckout}
              disabled={count === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
