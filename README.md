# Aura — Premium South Asian Fashion (Bangladesh)
### A Khaadi-Inspired Next.js 14 E-Commerce Platform

---

## ⚡ Quick Start (3 Commands)

```bash
# 1. Install all dependencies
npm install

# 2. Create the SQLite database and push the schema
npx prisma db push

# 3. Seed 100 products and start the dev server
npm run db:seed && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🏗️ Full Setup (First Time)

```bash
# Clone / create project
cd aura-khaadi

# Install dependencies (includes Prisma, Swiper, Lucide, Zustand)
npm install

# Generate the Prisma client
npx prisma generate

# Push schema to SQLite (creates dev.db)
npx prisma db push

# Seed exactly 100 high-quality products
npm run db:seed

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
aura-khaadi/
├── app/
│   ├── api/
│   │   ├── products/route.ts       ← Products REST API
│   │   └── orders/route.ts         ← Orders API (COD + SSLCommerz)
│   ├── checkout/
│   │   ├── page.tsx                ← Full checkout form
│   │   └── success/page.tsx        ← Order confirmation
│   ├── products/
│   │   ├── page.tsx                ← Product listing (filter, sort, paginate)
│   │   ├── ProductsFilter.tsx      ← Client-side filter sidebar
│   │   └── [slug]/
│   │       ├── page.tsx            ← Server component wrapper
│   │       └── ProductDetail.tsx   ← Client component (cart, size, color)
│   ├── globals.css                 ← Luxury design system CSS
│   ├── layout.tsx                  ← Root layout + Playfair Display font
│   ├── loading.tsx                 ← Spinner
│   ├── not-found.tsx               ← 404 page
│   └── page.tsx                    ← Homepage (hero, categories, products)
├── components/
│   ├── Header.tsx                  ← Sticky nav + Mega Menu
│   ├── HeroSlider.tsx              ← Swiper multi-slide hero
│   ├── ProductCard.tsx             ← Grid card with quick-add
│   ├── CartSidebar.tsx             ← Slide-out cart
│   ├── SearchModal.tsx             ← Live search overlay
│   └── Footer.tsx                  ← Newsletter + links
├── lib/
│   ├── prisma.ts                   ← Global singleton (no "too many connections")
│   └── utils.ts                    ← formatBDT (৳), generateOrderNumber, etc.
├── store/
│   └── cartStore.ts                ← Zustand cart (persisted to localStorage)
├── prisma/
│   ├── schema.prisma               ← SQLite schema (Product, Order, OrderItem)
│   └── seed.ts                     ← 100 products across 6 categories
├── .env                            ← DATABASE_URL="file:./dev.db"
├── next.config.js                  ← Unsplash image domains allowed
└── tailwind.config.js              ← Playfair Display, luxury palette
```

---

## 🗄️ Database

**SQLite via Prisma** — no cloud, no Supabase, no Firebase.

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  category    String    // Unstitched | Ready-to-Wear | Accessories | Lawn | Khaddar | Linen
  price       Float     // In BDT (৳)
  salePrice   Float?
  imageUrl    String
  fabric      String?
  colors      String    // JSON array
  sizes       String    // JSON array (XS–XXL)
  isFeatured  Boolean
  isNew       Boolean
  isSale      Boolean
  ...
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique  // AURA-XXXXX-XXXX
  paymentMethod   String      // "COD" | "SSLCommerz"
  paymentStatus   String      // "Pending" | "Paid" | "Failed"
  orderStatus     String      // "Processing" | "Shipped" | "Delivered"
  total           Float       // BDT
  ...
}
```

### Useful Prisma Commands

```bash
npx prisma studio         # Visual DB browser at localhost:5555
npx prisma db push        # Sync schema → database
npx prisma generate       # Regenerate Prisma client
npm run db:seed           # Re-seed products (skips if 100+ already exist)
```

---

## 💳 Payment Methods

### Cash on Delivery (COD)
- Selected by default
- No API keys needed
- Order status: `Processing` → `Confirmed` → `Shipped` → `Delivered`

### SSLCommerz (Demo Mode)
- Add your credentials to `.env`:
  ```
  SSLCOMMERZ_STORE_ID="your_store_id"
  SSLCOMMERZ_STORE_PASSWORD="your_store_password"
  SSLCOMMERZ_IS_LIVE="false"
  ```
- Get sandbox credentials at [developer.sslcommerz.com](https://developer.sslcommerz.com)
- Demo mode redirects to success page (no real payment)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Font | Playfair Display (Serif) |
| Body Font | Lato |
| Accent Font | Cormorant Garamond |
| Background | `#FAFAFA` (warm white) |
| Text | `#0A0A0A` (near-black) |
| Gold Accent | `#C9A96E` |
| Border Radius | `0px` everywhere (sharp luxury) |
| Product Grid | 2 cols mobile → 4 cols desktop |

---

## 🚢 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

For Vercel, set the environment variable `DATABASE_URL` and use a persistent volume or migrate to PlanetScale/Neon for serverless.

---

## 🛠️ Common Fixes from Trae/Cursor

| Issue | Fix |
|-------|-----|
| `Cannot find module '@/store/cartStore'` | Run `npm install zustand` |
| Swiper CSS not loading | Dynamic imports in HeroSlider.tsx handle this |
| Image domains blocked | `next.config.js` already whitelists `images.unsplash.com` |
| "Too many Prisma connections" | `lib/prisma.ts` uses global singleton pattern |
| Prices showing `$` | All prices use `formatBDT()` → `৳` symbol |
| Build fails on `prisma/client` | Run `npx prisma generate` first |
