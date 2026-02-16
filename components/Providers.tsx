'use client';

import type { PropsWithChildren } from 'react';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
