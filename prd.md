# Birthday Collection Experience - Build PRD / Prompt

Use this document as the implementation prompt for AI coding tools (Codex, Cursor, etc.).

## 1. Product Goal
Build a front-end-only e-commerce web experience for a birthday gift.

The app must support two entry modes:
1. Normal store browsing mode
2. Guided experience mode that walks through the collection and adds items to cart

The site must also include a global theme switch that changes visual style from minimal monochrome to a Scandinavian/Viking-inspired look without changing layout or information architecture.

## 2. Core Experience
At launch (`/`), show a decision hero with two actions:
1. `Enter Store` -> `/store`
2. `Start the Experience` -> `/experience`

Both modes share the same cart state.

## 3. Scope and Constraints
- No backend
- No auth
- No real payments
- Static/local data only
- Deployable to Vercel
- Mobile and desktop responsive
- Minimal default look (mostly black/white/neutral)
- Viking mode = visual skin only (same structure, different theme variables)

## 4. Tech Stack
- Next.js (App Router)
- TypeScript
- React
- Custom CSS (no Tailwind)
- CSS variables for design tokens and theming
- Local state via React Context
- Static assets from `/public`

## 5. Data Model
```ts
type Product = {
  id: string;
  name: string;
  description: string;
  narrative: string; // for guided mode
  price: number;
  image: string;
  archived: boolean;
  size: string; // single fixed size
  category: 'Layer' | 'Utility' | 'Ceremony' | 'Archive';
};
```

Inventory requirements:
- 5 active products
- 2 archived products

Archived product rules:
- Distinct card treatment
- Grayscale/muted visual
- "Archived" badge
- Cannot be added to cart

## 6. Route Requirements
- `/` = mode-selection entry
- `/store` = standard e-commerce grid with filtering
- `/experience` = guided product sequence + progress + cart completion moment

## 7. Feature Requirements

### 7.1 Shared Header
- Logo
- Nav links (Store, Experience)
- Cart button with count
- Theme toggle button

### 7.2 Store Mode
- Product grid with 7 cards total
- Filter controls: all / collection / archive
- Add-to-cart on active products
- Archived cards non-purchasable

### 7.3 Cart + Checkout
- Cart drawer or modal
- Remove and clear actions
- Checkout trigger
- Prefilled checkout form fields (name/address/email)
- Place order action opens confirmation state
- Confirmation includes a birthday reveal message
- Lightweight confetti/celebration effect

### 7.4 Guided Experience Mode
Flow:
1. Intro screen
2. 5 product reveal steps (one by one)
3. Progress indicator (x/5)
4. Add-to-cart CTA per step
5. Final summary screen
6. Auto-open cart at completion

### 7.5 Theme Toggle
Implement via CSS variable overrides:
- `data-theme="default"`
- `data-theme="viking"`

Persist theme in `localStorage`.

Default theme:
- monochrome/minimal
- clean typography

Viking theme:
- darker textured background
- muted red/gold accents
- display typography with Norse/heritage feel
- same DOM structure and layout

## 8. UX / Accessibility
- Semantic HTML
- Keyboard-operable controls
- Visible focus styles
- ARIA label for cart drawer/modal interactions
- Smooth transitions and intentional motion

## 9. Suggested Folder Structure
```text
/app
  /page.tsx
  /store/page.tsx
  /experience/page.tsx
/components
  Header.tsx
  ProductCard.tsx
  CartDrawer.tsx
  CheckoutModal.tsx
  ThemeToggle.tsx
/context
  CartContext.tsx
  ThemeContext.tsx
/data
  products.ts
/styles
  globals.css
/public/products
```

## 10. Acceptance Criteria
- User can choose entry mode from `/`
- Store mode shows products in responsive grid
- Active products can be added to cart
- Archived products are visually distinct and non-purchasable
- Guided mode walks through all 5 active products
- Cart state is shared across routes
- Checkout flow is functional (mocked) with prefilled fields
- Final confirmation shows birthday message
- Theme switch updates UI instantly without reload
- Theme preference persists between refreshes
- Works on mobile and desktop

## 11. Delivery Target
Deploy as a static-ready frontend project to Vercel.
