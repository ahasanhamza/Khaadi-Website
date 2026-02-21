import { prisma } from '@/lib/prisma'

const BASE = process.env.NEXTAUTH_URL || 'https://yourdomain.com'

const STATIC = [
  '', '/products', '/help', '/size-guide', '/delivery-info',
  '/returns-and-exchange', '/track-order', '/contact-us', '/privacy-policy', '/terms',
]

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.map(p => `  <url>
    <loc>${BASE}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${products.map(p => `  <url>
    <loc>${BASE}/products/${p.slug}</loc>
    <lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
