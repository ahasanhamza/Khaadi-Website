// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── CATEGORIES & METADATA ───────────────────────────────────────────────────

const CATEGORIES = [
  'Lawn',
  'Khaddar',
  'Chiffon',
  'Silk',
  'Cotton',
  'Embroidered',
  'Bridal',
  'Formal',
  'Casual',
  'Saree',
  'Lehenga',
  'Panjabi',
  'Accessories',
]

const FABRICS = [
  'Pure Cotton',
  'Swiss Lawn',
  'Khaddar',
  'Pure Silk',
  'Chiffon',
  'Georgette',
  'Organza',
  'Net',
  'Velvet',
  'Linen',
  'Raw Silk',
  'Muslin',
  'Katan Silk',
  'Banarasi Silk',
  'Jacquard',
]

const COLORS = [
  'Ivory White',
  'Midnight Black',
  'Dusty Rose',
  'Forest Green',
  'Navy Blue',
  'Terracotta',
  'Sage Green',
  'Burgundy',
  'Powder Blue',
  'Mustard',
  'Crimson',
  'Teal',
  'Lavender',
  'Saffron',
  'Emerald',
  'Coral',
  'Champagne',
  'Plum',
  'Peacock Blue',
  'Marigold',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const MEN_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
const FREE_SIZE = ['Free Size']

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
  'https://images.unsplash.com/photo-1617627143233-0b0b5e3e5c8b?w=800',
  'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800',
  'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800',
  'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
  'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=800',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4c2a?w=800',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800',
  'https://images.unsplash.com/photo-1583744946564-b52d91289db5?w=800',
  'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800',
  'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800',
  'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
]

// ─── PRODUCT NAME BANKS ───────────────────────────────────────────────────────
// Origin tags: [PK] = Pakistan · [BD] = Bangladesh · [IN] = India

const PRODUCT_NAMES: Record<string, string[]> = {

  // ── PAKISTAN · Lawn (Summer 3-Piece) ──────────────────────────────────────
  'Lawn': [
    '[PK] Crimson Bloom Embroidered Lawn 3-Piece',
    '[PK] Ivory Orchid Swiss Lawn Suit',
    '[PK] Saffron Heritage Block-Print Lawn',
    '[PK] Azure Mist Digital Lawn 3-Piece',
    '[PK] Mango Yellow Casual Lawn Set',
    '[PK] Peach Blossom Embroidered Lawn',
    '[PK] Mint Splash Watercolour Lawn Suit',
    '[PK] Coral Stripe Minimalist Lawn 2-Piece',
    '[PK] Rose Garden Premium Lawn Collection',
    '[PK] Sage Serenity Lawn 3-Piece',
    '[PK] Noor Digital Floral Lawn',
    '[PK] Zara Embroidered Swiss Lawn',
    '[PK] Layla Pastel Lawn Set',
    '[PK] Dua Printed Chiffon Lawn',
    '[PK] Hamsafar Luxury Lawn 3-Piece',
  ],

  // ── PAKISTAN · Khaddar (Winter) ────────────────────────────────────────────
  'Khaddar': [
    '[PK] Rose Petal Khaddar Winter Suit',
    '[PK] Fawn Embroidered Khaddar 3-Piece',
    '[PK] Deep Blue Karandi Shawl Suit',
    '[PK] Charcoal Khaddar Classic Set',
    '[PK] Olive Wool-Blend Khaddar Suit',
    '[PK] Rust Embroidered Winter Khaddar',
    '[PK] Camel Heritage Khaddar 3-Piece',
    '[PK] Burgundy Khaddar Shawl Collection',
    '[PK] Mustard Block-Print Khaddar Set',
    '[PK] Navy Karandi Formal Suit',
  ],

  // ── PAKISTAN · Chiffon & Silk (Festive/Formal) ────────────────────────────
  'Chiffon': [
    '[PK] Pearl Organza Sharara Set',
    '[PK] Scarlet Net Gharara Suit',
    '[PK] Teal Chiffon Anarkali Gown',
    '[PK] Lavender Chiffon 3-Piece',
    '[PK] Blush Palazzo Chiffon Set',
    '[PK] Pistachio Organza Eid Sharara',
    '[PK] Coral Ombré Chiffon Suit',
    '[PK] Golden Chikankari Voile Suit',
    '[PK] Aubergine Velvet Peshwas',
    '[PK] Turquoise Georgette Festive Suit',
    '[PK] Cerise Embroidered Chiffon Kurta',
    '[PK] Blush Net Sequin Dupatta Suit',
  ],

  // ── PAKISTAN · Silk (Premium) ──────────────────────────────────────────────
  'Silk': [
    '[PK] Emerald Pure Silk Patiala Set',
    '[PK] Midnight Velvet Shawl Suit',
    '[PK] Eid Festive Jacquard Silk Suit',
    '[PK] Bottle Green Silk Gharara',
    '[PK] Ivory Raw Silk Formal Suit',
    '[PK] Navy Raw Silk Formal Suit',
  ],

  // ── PAKISTAN · Embroidered ─────────────────────────────────────────────────
  'Embroidered': [
    '[PK] Sage Green Organza Pishwas',
    '[PK] Blush Embroidered Festive Set',
    '[PK] Turquoise Mirror-Work Kurta',
    '[PK] Eid Embroidered Jacquard 3-Piece',
    '[PK] Charcoal Formal Embroidered Suit',
    '[PK] Maisha Printed Embroidered Suit',
  ],

  // ── PAKISTAN · Bridal ──────────────────────────────────────────────────────
  'Bridal': [
    '[PK] Regal Zardozi Bridal Lehenga',
    '[PK] Ivory Nikkah Gharara Set',
    '[PK] Gold Walima Chiffon Lehenga',
    '[PK] Deep Maroon Mehndi Sharara',
    '[PK] Copper Barat Silk Lehenga',
    '[PK] Crimson Bridal Anarkali Gown',
  ],

  // ── PAKISTAN · Formal & Casual ─────────────────────────────────────────────
  'Formal': [
    '[PK] Charcoal Raw Silk Office Suit',
    '[PK] Navy Pleated Palazzo Crepe Set',
    '[PK] Ivory Formal Raw Silk Suit',
    '[PK] Steel Grey Structured Kameez',
    '[PK] Camel Formal Linen Trouser Set',
  ],

  'Casual': [
    '[PK] Sage Garden Cotton Kurti',
    '[PK] Indigo Block-Print Daily Kurti',
    '[PK] Terracotta Linen Straight Kurti',
    '[PK] Burgundy Peplum Cotton Kurti',
    '[PK] Draped Asymmetric Cotton-Silk Kurti',
    '[PK] Mustard Casual Pret Collection',
  ],

  // ── BANGLADESH · Saree ─────────────────────────────────────────────────────
  'Saree': [
    '[BD] Dhakai Jamdani Heritage Saree',
    '[BD] Rajshahi Katan Silk Wedding Saree',
    '[BD] Soft Muslin Everyday Saree',
    '[BD] Bengal Tant Casual Cotton Saree',
    '[BD] Nakshi Kantha Embroidered Saree',
    '[BD] Eid Banarasi Fusion Silk Saree',
    '[BD] Silk Georgette Party Saree',
    '[BD] Bijoy Dibosh Special Tant Saree',
    '[BD] Shitol Pati Motif Printed Saree',
    '[BD] Traditional Dhakai Wedding Saree',
    '[IN] Banarasi Pure Silk Bridal Saree',
    '[IN] Chanderi Silk-Cotton Saree',
    '[IN] Kanjivaram Temple Silk Saree',
    '[IN] Mysore Pure Silk Crepe Saree',
    '[IN] Paithani Peacock Motif Saree',
    '[IN] Pochampally Ikat Cotton Saree',
    '[IN] Sambalpuri Bandha Silk Saree',
    '[IN] Bhagalpuri Tussar Silk Saree',
    '[IN] Kerala Kasavu Cotton Saree',
    '[IN] Phulkari Embroidered Saree',
    '[IN] Patola Double-Ikat Silk Saree',
    '[IN] Maheswari Silk-Cotton Saree',
    '[IN] Assamese Muga Mekhela Chador',
    '[IN] Kutch Mirror-Work Cotton Saree',
    '[IN] Benarasi Organza Party Saree',
    '[IN] South Indian Kanjivaram Bridal Saree',
    '[IN] Himroo Brocade Formal Saree',
  ],

  // ── INDIA & MIXED · Lehenga ────────────────────────────────────────────────
  'Lehenga': [
    '[IN] Bridal Velvet Zardozi Lehenga',
    '[IN] Rajasthani Bandhani Festive Lehenga',
    '[IN] Pastel Organza Sangeet Lehenga',
    '[IN] Gujarati Ghagra Choli Set',
    '[IN] Gota Patti Georgette Lehenga',
    '[IN] Banjara Mirror-Work Lehenga',
    '[IN] Zardozi Bridal Sharara Choli',
    '[IN] Indigo Chikankari Anarkali Gown',
    '[IN] Kashmiri Sozni Embroidered Suit',
    '[PK] Deep Maroon Silk Festive Lehenga',
    '[PK] Ivory Net Bridal Lehenga Set',
  ],

  // ── BANGLADESH & INDIA · Panjabi/Kurta (Men's) ────────────────────────────
  'Panjabi': [
    '[BD] Classic White Eid Panjabi',
    '[BD] Indigo Muslin Luxury Panjabi',
    '[BD] Embroidered Teal Silk Panjabi',
    '[BD] Rajshahi Katan Formal Panjabi',
    '[BD] Chapa Printed Casual Panjabi',
    '[BD] Cream Festive Embroidered Panjabi',
    '[IN] Royal Brocade Wedding Sherwani',
    '[IN] Indigo Nehru Jacket Kurta Set',
    '[IN] White Dhoti Kurta Classic Set',
    '[IN] Saffron Silk Festive Kurta Churidar',
    '[IN] Ivory Sherwani Formal Set',
    '[IN] Maroon Embroidered Wedding Kurta',
  ],

  // ── ACCESSORIES ────────────────────────────────────────────────────────────
  'Accessories': [
    '[PK] Silk Embroidered Dupatta',
    '[PK] Lawn Printed Cotton Stole',
    '[PK] Premium Pashmina Shawl',
    '[BD] Nakshi Kantha Embroidered Stole',
    '[BD] Muslin Hand-Print Dupatta',
    '[IN] Banarasi Silk Dupatta',
    '[IN] Phulkari Embroidered Dupatta',
    '[PK] Handcrafted Embroidered Clutch',
    '[PK] Traditional Jhumka Earrings',
    '[IN] Oxidised Silver Earring Set',
    '[BD] Brass Bangle Collection',
    '[IN] Kundan Statement Necklace',
  ],
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function generateSlug(name: string, index: number): string {
  return (
    name
      .toLowerCase()
      .replace(/\[pk\]|\[bd\]|\[in\]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .trim() +
    '-' +
    index
  )
}

function getRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min) * 100
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function getSizesForCategory(category: string): string[] {
  if (category === 'Accessories') return []
  if (category === 'Panjabi') return MEN_SIZES
  if (category === 'Saree') return FREE_SIZE
  return SIZES
}

function getPriceRangeForCategory(category: string): [number, number] {
  switch (category) {
    case 'Bridal':    return [250, 800]   // 25,000 – 80,000
    case 'Lehenga':   return [120, 650]   // 12,000 – 65,000
    case 'Silk':      return [60, 120]    // 6,000  – 12,000
    case 'Saree':     return [35, 500]    // 3,500  – 50,000
    case 'Chiffon':   return [55, 180]    // 5,500  – 18,000
    case 'Embroidered': return [50, 160]  // 5,000  – 16,000
    case 'Khaddar':   return [40, 90]     // 4,000  – 9,000
    case 'Lawn':      return [22, 60]     // 2,200  – 6,000
    case 'Formal':    return [45, 100]    // 4,500  – 10,000
    case 'Panjabi':   return [35, 120]    // 3,500  – 12,000
    case 'Accessories': return [8, 45]   // 800    – 4,500
    case 'Casual':    return [16, 40]     // 1,600  – 4,000
    default:          return [30, 80]     // 3,000  – 8,000
  }
}

function buildDescription(name: string, category: string, fabric: string): string {
  const cleanName = name.replace(/\[PK\]|\[BD\]|\[IN\]/g, '').trim()
  const origin =
    name.startsWith('[PK]') ? 'Pakistan' :
    name.startsWith('[BD]') ? 'Bangladesh' : 'India'

  const descriptors: Record<string, string> = {
    Lawn:       'featuring exquisite craftsmanship and vibrant print work',
    Khaddar:    'crafted for warmth and comfort in cooler months',
    Chiffon:    'with delicate embroidery and a flowing, elegant silhouette',
    Silk:       'showcasing the finest weaving traditions with a natural lustrous finish',
    Embroidered:'adorned with intricate hand-embroidery by skilled artisans',
    Bridal:     'a masterpiece ensemble created for life\'s most precious occasions',
    Formal:     'tailored for refined professional and formal engagements',
    Casual:     'designed for effortless everyday elegance',
    Saree:      'celebrating centuries of South Asian weaving heritage',
    Lehenga:    'a breathtaking ensemble for festive and bridal celebrations',
    Panjabi:    'a graceful menswear piece rooted in South Asian tradition',
    Accessories:'a carefully crafted accent to complete any ensemble',
  }

  return (
    `A stunning ${category.toLowerCase()} piece from our exclusive South Asian collection, crafted in ${origin}. ` +
    `The ${cleanName.toLowerCase()} is made from premium ${fabric.toLowerCase()}, ` +
    `${descriptors[category] ?? 'offering timeless style and exceptional quality'}. ` +
    `Perfect for both special occasions and refined everyday wear.`
  )
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
  let imageIdx = 0

  for (const [category, names] of Object.entries(PRODUCT_NAMES)) {
    const [priceMin, priceMax] = getPriceRangeForCategory(category)
    const sizes = getSizesForCategory(category)

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const price = getRandomPrice(priceMin, priceMax)
      const isSale = Math.random() > 0.65
      const salePrice = isSale ? Math.floor(price * 0.8) : null
      const fabric = FABRICS[Math.floor(Math.random() * FABRICS.length)]
      const productColors = pickRandom(COLORS, Math.floor(Math.random() * 4) + 2)
      const isFeatured = products.length < 16
      const isNew = products.length < 35

      products.push({
        name,
        slug: generateSlug(name, products.length + 1),
        description: buildDescription(name, category, fabric),
        price,
        salePrice,
        imageUrl: UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
        images: JSON.stringify([
          UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 1) % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 2) % UNSPLASH_IMAGES.length],
        ]),
        category,
        subCategory: name.includes('[PK]')
          ? 'Pakistan' : name.includes('[BD]')
          ? 'Bangladesh' : 'India',
        fabric,
        colors: JSON.stringify(productColors),
        sizes: JSON.stringify(sizes),
        stock: Math.floor(Math.random() * 50) + 10,
        isFeatured,
        isNew,
        isSale: !!salePrice,
      })

      imageIdx++
    }
  }

  // Insert in batches
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  // Summary
  const byOrigin = {
    '🇵🇰 Pakistan':   products.filter(p => p.subCategory === 'Pakistan').length,
    '🇧🇩 Bangladesh': products.filter(p => p.subCategory === 'Bangladesh').length,
    '🇮🇳 India':      products.filter(p => p.subCategory === 'India').length,
  }

  console.log(`\n✅ Seeded ${products.length} products successfully!`)
  console.log('\n📦 Origin Breakdown:')
  Object.entries(byOrigin).forEach(([label, count]) =>
    console.log(`   ${label}: ${count} items`)
  )
  console.log(`\n🏷️  Categories (${CATEGORIES.length}): ${CATEGORIES.join(', ')}`)
  console.log(`⭐ Featured: ${products.filter(p => p.isFeatured).length}`)
  console.log(`🆕 New: ${products.filter(p => p.isNew).length}`)
  console.log(`🔖 On Sale: ${products.filter(p => p.isSale).length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
