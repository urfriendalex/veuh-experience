# Birthday Collection Experience

A front-end-only e-commerce experience with:
- Store mode (`/store`)
- Guided experience mode (`/experience`)
- Shared cart + mock checkout
- Default/minimal and Viking theme switch

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build
```bash
npm run build
```

Project is configured for static export (`next.config.mjs -> output: 'export'`).

## Deploy
Deploy to Vercel as a standard Next.js project.

## Main Files
- `app/page.tsx`
- `app/store/page.tsx`
- `app/experience/page.tsx`
- `context/CartContext.tsx`
- `context/ThemeContext.tsx`
- `data/products.ts`
- `styles/globals.css`
- `prd.md`
