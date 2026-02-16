'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import type { Product } from '@/data/products';

type CartMap = Record<string, Product>;

type CartContextValue = {
  items: Product[];
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  orderPlaced: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  placeOrder: () => void;
  resetOrderState: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartMap, setCartMap] = useState<CartMap>({});
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const items = useMemo(() => Object.values(cartMap), [cartMap]);
  const count = items.length;
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price, 0),
    [items]
  );

  const addToCart = useCallback((product: Product) => {
    if (product.archived) {
      return;
    }

    setCartMap((current) => ({
      ...current,
      [product.id]: product
    }));
    setOrderPlaced(false);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartMap((current) => {
      if (!current[productId]) {
        return current;
      }

      const updated = { ...current };
      delete updated[productId];
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartMap({});
  }, []);

  const isInCart = useCallback(
    (productId: string) => {
      return Boolean(cartMap[productId]);
    },
    [cartMap]
  );

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const openCheckout = useCallback(() => {
    setCheckoutOpen(true);
    setCartOpen(false);
    setOrderPlaced(false);
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
  }, []);

  const placeOrder = useCallback(() => {
    setOrderPlaced(true);
    clearCart();
  }, [clearCart]);

  const resetOrderState = useCallback(() => {
    setOrderPlaced(false);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isCartOpen,
      isCheckoutOpen,
      orderPlaced,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      placeOrder,
      resetOrderState
    }),
    [
      items,
      count,
      subtotal,
      isCartOpen,
      isCheckoutOpen,
      orderPlaced,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      placeOrder,
      resetOrderState
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
