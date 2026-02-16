'use client';

import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';

export function GlobalOverlays() {
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
