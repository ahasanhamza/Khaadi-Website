// prisma/seed.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fields used here match your ACTUAL schema exactly as revealed by the error:
//   name, slug, description, price, salePrice, imageUrl, images,
//   category, fabric, colors, sizes, stock,
//   isFeatured, isNew, isSale, isActive
//
// NOT used (don't exist in your schema):
//   subCategory, featured, active
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Unstitched',     // 25 products
  'Ready-to-Wear',  // 25 products
  'Bottoms',        // 20 products
  'Dupattas',       // 15 products
  'Accessories',    // 15 products
]

const FABRICS: Record<string, string[]> = {
  'Unstitched':    ['Swiss Lawn', 'Khaddar', 'Linen', 'Chiffon', 'Pure Cotton', 'Silk', 'Georgette'],
  'Ready-to-Wear': ['Swiss Lawn', 'Pure Cotton', 'Silk', 'Chiffon', 'Georgette', 'Organza', 'Raw Silk'],
  'Bottoms':       ['Pure Cotton', 'Silk', 'Chiffon', 'Khaddar', 'Linen', 'Georgette', 'Net'],
  'Dupattas':      ['Chiffon', 'Silk', 'Net', 'Organza', 'Lawn', 'Georgette'],
  'Accessories':   ['Leather', 'Brass', 'Silk', 'Cotton', 'Velvet'],
}

const COLORS = [
  'Ivory White', 'Midnight Black', 'Dusty Rose', 'Forest Green',
  'Navy Blue', 'Terracotta', 'Sage Green', 'Burgundy',
  'Powder Blue', 'Mustard', 'Crimson Red', 'Teal',
  'Lavender', 'Saffron', 'Emerald', 'Coral',
  'Champagne', 'Plum', 'Peacock Blue', 'Marigold',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

// 20 verified working Unsplash fashion image URLs
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617627143233-0b0b5e3e5c8b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4c2a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583744946564-b52d91289db5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&auto=format&fit=crop',
]

// ─── PRODUCT NAME BANKS (25 + 25 + 20 + 15 + 15 = 100 exactly) ──────────────

const PRODUCT_NAMES: Record<string, string[]> = {

  // ── 25 Unstitched ──────────────────────────────────────────────────────────
  'Unstitched': [
    'Crimson Bloom Embroidered Lawn 3-Piece',
    'Ivory Orchid Swiss Lawn Suit',
    'Saffron Heritage Block-Print Lawn',
    'Azure Mist Digital Print Lawn',
    'Mango Yellow Casual Lawn 2-Piece',
    'Peach Blossom Embroidered Suit',
    'Mint Watercolour Lawn 3-Piece',
    'Coral Stripe Minimalist Lawn Set',
    'Rose Garden Premium Lawn Collection',
    'Sage Serenity Printed Lawn 3-Piece',
    'Noor Floral Digital Lawn',
    'Zara Embroidered Swiss Lawn',
    'Layla Pastel Lawn 3-Piece',
    'Hamsafar Luxury Lawn Collection',
    'Rose Petal Khaddar Winter 3-Piece',
    'Fawn Embroidered Khaddar Suit',
    'Charcoal Karandi Shawl 3-Piece',
    'Mustard Block-Print Khaddar Set',
    'Olive Wool-Blend Winter Suit',
    'Camel Heritage Khaddar 3-Piece',
    'Pure Linen Embroidered 3-Piece',
    'Natural Linen Casual Suit',
    'Breezy Linen Printed Set',
    'Classic Linen Formal 3-Piece',
    'Summer Linen Collection Set',
  ],

  // ── 25 Ready-to-Wear ───────────────────────────────────────────────────────
  'Ready-to-Wear': [
    'Classic Embroidered Kurta Set',
    'Festive Anarkali Floor-Length Gown',
    'Casual Cotton Shalwar Kameez',
    'Formal Silk Kurta Trouser',
    'Printed Chiffon Shirt Trouser',
    'Party Wear Organza Suit',
    'Pret Cotton Kurti Set',
    'Heritage Embroidered Pret Suit',
    'Contemporary Silk Coord Set',
    'Modern Georgette Fusion Kurta',
    'Bridal Pret Embroidered Collection',
    'Teal Chiffon Anarkali Gown',
    'Pearl Organza Sharara Suit',
    'Lavender Chiffon 3-Piece Pret',
    'Emerald Silk Patiala Set',
    'Blush Sequin Festive Kurta',
    'Ivory Neckline Embroidered Kurta',
    'Turquoise Mirror-Work Pret Suit',
    'Coral Ombre Casual Kurta',
    'Pistachio Organza Eid Suit',
    'Midnight Velvet Formal Kurta',
    'Aubergine Floor-Length Anarkali',
    'Cerise Embroidered Festive Kurta',
    'Navy Formal Palazzo Kurta',
    'Dusty Rose Casual Pret Set',
  ],

  // ── 20 Bottoms ─────────────────────────────────────────────────────────────
  'Bottoms': [
    'Classic Black Wide-Leg Trouser',
    'Ivory Silk Gharara',
    'Navy Pleated Palazzo Pants',
    'Crimson Embroidered Sharara',
    'Cotton Casual Shalwar',
    'Formal Silk Churidar',
    'Khaddar Winter Straight Trouser',
    'Emerald Flared Gharara',
    'Printed Chiffon Palazzo',
    'Embroidered Net Sharara',
    'Linen Wide-Leg Casual Trouser',
    'Festive Gold Brocade Gharara',
    'Minimal Cotton Cigarette Trouser',
    'Velvet Embroidered Sharara',
    'Silk Flared Palazzo Set',
    'Block-Print Cotton Shalwar',
    'Organza Layered Gharara',
    'Formal Crepe Straight Trouser',
    'Heritage Printed Shalwar',
    'Premium Georgette Palazzo',
  ],

  // ── 15 Dupattas ────────────────────────────────────────────────────────────
  'Dupattas': [
    'Ivory Silk Embroidered Dupatta',
    'Chiffon Digital Floral Dupatta',
    'Heavy Organza Bridal Dupatta',
    'Lawn Cotton Printed Stole',
    'Net Sequin Evening Dupatta',
    'Georgette Phulkari Dupatta',
    'Silk Banarasi Weave Dupatta',
    'Sheer Chiffon Block-Print Dupatta',
    'Embroidered Border Lawn Dupatta',
    'Velvet Hand-Embroidered Dupatta',
    'Mirror-Work Cotton Dupatta',
    'Premium Pashmina Shawl Dupatta',
    'Ombre Silk Chiffon Dupatta',
    'Traditional Kantha Stitch Dupatta',
    'Gota Patti Festive Dupatta',
  ],

  // ── 15 Accessories ─────────────────────────────────────────────────────────
  'Accessories': [
    'Handcrafted Leather Clutch',
    'Embroidered Velvet Evening Bag',
    'Traditional Brass Jhumka Earrings',
    'Oxidised Silver Choker Set',
    'Kundan Statement Necklace',
    'Silk Printed Scarf',
    'Beaded Potli Bag',
    'Gold-Tone Bangles Set',
    'Handwoven Tote Bag',
    'Pearl Drop Earring Set',
    'Embroidered Coin Purse',
    'Silver Filigree Cuff Bracelet',
    'Leather Satchel Crossbody',
    'Stone-Set Maang Tikka',
    'Classic Khussa Embroidered Flats',
  ],
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function generateSlug(name: string, index: number): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .trim() +
    '-' +
    index
  )
}

function getRandomPrice(min: number, max: number): number {
  // Multiplied by 100 so min=22 → PKR 2,200
  return Math.floor(Math.random() * (max - min + 1) + min) * 100
}

function getPriceRange(category: string): [number, number] {
  switch (category) {
    case 'Unstitched':    return [22, 65]
    case 'Ready-to-Wear': return [35, 180]
    case 'Bottoms':       return [18, 80]
    case 'Dupattas':      return [12, 55]
    case 'Accessories':   return [8, 45]
    default:              return [20, 60]
  }
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
}

function getSizes(category: string): string[] {
  if (category === 'Accessories' || category === 'Dupattas') return []
  return SIZES
}

function buildDescription(name: string, category: string, fabric: string): string {
  const map: Record<string, string> = {
    'Unstitched':
      `An exquisite unstitched ensemble crafted from premium ${fabric}. ` +
      `The ${name.toLowerCase()} comes as a complete fabric set ready to be tailored to your perfect fit. ` +
      `Ideal for both casual and formal occasions across all seasons.`,
    'Ready-to-Wear':
      `Step out effortlessly in the ${name.toLowerCase()}, a luxurious ready-to-wear piece in ${fabric}. ` +
      `Designed for the modern South Asian woman who values both comfort and elegance, ` +
      `it transitions seamlessly from daytime events to evening gatherings.`,
    'Bottoms':
      `Complete your ensemble with the ${name.toLowerCase()}, crafted in fine ${fabric}. ` +
      `The thoughtful cut and refined detailing make this an essential piece in any ` +
      `South Asian wardrobe, pairing beautifully with both embroidered and printed tops.`,
    'Dupattas':
      `Add the finishing touch with the ${name.toLowerCase()}, a statement ${fabric} dupatta ` +
      `featuring exquisite craftsmanship. Versatile enough to style with multiple outfits, ` +
      `it elevates any look from simple to spectacular.`,
    'Accessories':
      `The ${name.toLowerCase()} is a beautifully crafted piece in premium ${fabric}. ` +
      `Handcrafted by skilled artisans, it adds an authentic South Asian touch ` +
      `to your festive or everyday look.`,
  }
  return map[category] ?? `A premium ${category.toLowerCase()} piece crafted from ${fabric}.`
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting seed...')

  const existingCount = await prisma.product.count()
  if (existingCount >= 100) {
    console.log(`✅ Already have ${existingCount} products. Skipping seed.`)
    return
  }

  const products = []
  let imageIdx  = 0
  let globalIdx = 0

  for (const category of CATEGORIES) {
    const names        = PRODUCT_NAMES[category]
    const [pMin, pMax] = getPriceRange(category)
    const sizes        = getSizes(category)
    const fabricPool   = FABRICS[category]

    for (const name of names) {
      const price     = getRandomPrice(pMin, pMax)
      const onSale    = Math.random() > 0.65
      const salePrice = onSale ? Math.floor(price * 0.8) : null
      const fabric    = fabricPool[Math.floor(Math.random() * fabricPool.length)]
      const colors    = pickRandom(COLORS, Math.floor(Math.random() * 4) + 2)

      // ── ONLY the fields that exist in YOUR schema ─────────────────────────
      products.push({
        name,
        slug:        generateSlug(name, globalIdx + 1),
        description: buildDescription(name, category, fabric),
        price,
        salePrice,
        imageUrl: UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
        images:   JSON.stringify([
          UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 1) % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 2) % UNSPLASH_IMAGES.length],
        ]),
        category,
        fabric,
        colors:    JSON.stringify(colors),
        sizes:     JSON.stringify(sizes),
        stock:     Math.floor(Math.random() * 50) + 10,
        isFeatured: globalIdx < 12,
        isNew:      globalIdx < 30,
        isSale:     onSale,
        isActive:   true,
      })

      imageIdx++
      globalIdx++
    }
  }

  // Insert products one-by-one (safest for SQLite)
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log(`\n✅ Seeded ${products.length} products successfully!\n`)
  console.log('📦 Breakdown by category:')
  for (const cat of CATEGORIES) {
    const n = products.filter((p) => p.category === cat).length
    console.log(`   ${cat.padEnd(16)} ${n} products`)
  }
  console.log(`\n⭐ Featured : ${products.filter((p) => p.isFeatured).length}`)
  console.log(`🆕 New      : ${products.filter((p) => p.isNew).length}`)
  console.log(`🔖 On Sale  : ${products.filter((p) => p.isSale).length}`)
  console.log(`\n🏷️  Total    : ${products.length}/100`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
