// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CATEGORIES = ['Unstitched', 'Ready-to-Wear', 'Accessories', 'Lawn', 'Khaddar', 'Linen']
const FABRICS = ['Pure Cotton', 'Lawn', 'Khaddar', 'Linen', 'Chiffon', 'Silk', 'Georgette', 'Organza']
const COLORS = ['Ivory White', 'Midnight Black', 'Dusty Rose', 'Forest Green', 'Navy Blue', 'Terracotta', 'Sage Green', 'Burgundy', 'Powder Blue', 'Mustard']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4e09?w=800',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
  'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=800',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800',
  'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800',
  'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
  'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=800',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800',
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
]

const PRODUCT_NAMES = {
  'Unstitched': [
    'Aura Embroidered 3-Piece', 'Jasmine Lawn Collection', 'Pearl Khaddar Suit', 'Royal Chiffon Set',
    'Gulshan Printed 3-Piece', 'Mehndi Green Unstitched', 'Crimson Khaddar Collection', 'Azure Cotton Set',
    'Noor Digital Print', 'Hamsafar Lawn 3-Piece', 'Zara Embroidered Lawn', 'Saba Premium Cotton',
    'Maisha Printed Suit', 'Layla Lawn Collection', 'Tara Khaddar 3-Piece', 'Dua Chiffon Set',
    'Safina Lawn Print', 'Ruba Embroidered Set', 'Amna Premium Lawn', 'Hira Digital Collection',
  ],
  'Ready-to-Wear': [
    'Classic Kameez Trouser Set', 'Embroidered Kurta', 'Festive Gharara Set', 'Casual Shalwar Kameez',
    'Printed Shirt Trouser', 'Formal Anarkali', 'Pret Kurta Set', 'Cotton Kurti',
    'Party Wear Suit', 'Casual Pret Collection', 'Embroidered Pret Set', 'Premium Kameez',
    'Designer Kurta Trouser', 'Festive Pret Suit', 'Luxury Pret Collection', 'Occasion Wear Set',
    'Heritage Embroidered Suit', 'Contemporary Pret', 'Modern Fusion Kurta', 'Bridal Pret Collection',
  ],
  'Accessories': [
    'Silk Embroidered Dupatta', 'Cotton Printed Stole', 'Premium Silk Shawl', 'Handcrafted Clutch',
    'Embroidered Tote Bag', 'Traditional Jhumkas', 'Silver Bangles Set', 'Oxidized Earrings',
    'Lawn Printed Dupatta', 'Khaddar Shawl', 'Beaded Bracelet', 'Statement Necklace',
    'Silk Scarf', 'Embroidered Pouch', 'Designer Belt', 'Leather Satchel',
    'Floral Dupatta', 'Classic Stole', 'Gold-Tone Earrings', 'Printed Tote',
  ],
  'Lawn': [
    'Summer Bloom Lawn', 'Floral Garden Lawn', 'Digital Lawn Print', 'Embroidered Lawn Suit',
    'Classic Lawn 3-Piece', 'Premium Lawn Collection', 'Pastel Lawn Set', 'Vibrant Lawn Print',
    'Traditional Lawn Suit', 'Contemporary Lawn Design', 'Luxury Lawn Collection', 'Heritage Lawn Print',
    'Meadow Lawn 3-Piece', 'Blossom Lawn Collection', 'Rose Garden Lawn', 'Spring Lawn Set',
    'Dew Drop Lawn', 'Petals Lawn Collection', 'Garden Fresh Lawn', 'Nature Lawn Print',
  ],
  'Khaddar': [
    'Winter Khaddar 3-Piece', 'Embroidered Khaddar Suit', 'Plain Khaddar Set', 'Printed Khaddar Collection',
    'Premium Khaddar 3-Piece', 'Classic Khaddar Suit', 'Traditional Khaddar Set', 'Modern Khaddar Print',
    'Heritage Khaddar Collection', 'Luxury Khaddar Suit', 'Contemporary Khaddar', 'Festive Khaddar Set',
    'Warm Khaddar Collection', 'Cozy Khaddar Suit', 'Soft Khaddar Print', 'Elegant Khaddar 3-Piece',
    'Royal Khaddar Collection', 'Premium Winter Khaddar', 'Classic Winter Suit', 'Heritage Khaddar Print',
  ],
  'Linen': [
    'Pure Linen 3-Piece', 'Embroidered Linen Set', 'Printed Linen Suit', 'Classic Linen Collection',
    'Premium Linen 3-Piece', 'Contemporary Linen Set', 'Luxury Linen Suit', 'Heritage Linen Print',
    'Natural Linen Collection', 'Modern Linen Design', 'Traditional Linen Suit', 'Festive Linen Set',
    'Elegant Linen Print', 'Classic Linen Suit', 'Premium Linen Collection', 'Soft Linen 3-Piece',
    'Breezy Linen Set', 'Summer Linen Collection', 'Cool Linen Suit', 'Light Linen Print',
  ],
}

function generateSlug(name: string, index: number): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + index
}

function getRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min) * 100
}

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
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const price = getRandomPrice(8, 45) // 800 - 4500 BDT
      const isSale = Math.random() > 0.7
      const salePrice = isSale ? Math.floor(price * 0.8) : null
      const fabric = FABRICS[Math.floor(Math.random() * FABRICS.length)]
      const productColors = COLORS.slice(0, Math.floor(Math.random() * 4) + 2)
      const productSizes = category === 'Accessories' ? [] : SIZES

      products.push({
        name,
        slug: generateSlug(name, products.length + 1),
        description: `A stunning ${category.toLowerCase()} piece from our exclusive Aura collection. Crafted from premium ${fabric.toLowerCase()}, this ${name.toLowerCase()} features exquisite detailing and a timeless silhouette. Perfect for both casual and formal occasions.`,
        price,
        salePrice,
        imageUrl: UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
        images: JSON.stringify([
          UNSPLASH_IMAGES[imageIdx % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 1) % UNSPLASH_IMAGES.length],
          UNSPLASH_IMAGES[(imageIdx + 2) % UNSPLASH_IMAGES.length],
        ]),
        category,
        subCategory: fabric,
        fabric,
        colors: JSON.stringify(productColors),
        sizes: JSON.stringify(productSizes),
        stock: Math.floor(Math.random() * 50) + 10,
        isFeatured: products.length < 12,
        isNew: products.length < 30,
        isSale,
      })
      imageIdx++
    }
  }

  // Insert in batches
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log(`✅ Seeded ${products.length} products successfully!`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
