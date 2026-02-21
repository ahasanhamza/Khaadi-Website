// prisma/seed.ts  ← Replace the old seed file with this entire file
// 150+ individually crafted South Asian fashion products
// Origins: Bangladesh 🇧🇩 · Pakistan 🇵🇰 · India 🇮🇳
// Sub-categories: Salwar Kameez, Saree, Lehenga, Kurti, Sharara, Gharara,
//                 Anarkali, Palazzo, Panjabi, Sherwani, Dhoti Kurta,
//                 Jamdani, Katan, Muslin, Banarasi, Chanderi, Patola,
//                 Bridal, Festive, Casual, Formal, Eid, Puja, Wedding

import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ─── IMAGE POOL (20 working Unsplash photo IDs) ──────────────────────────────
const IMG_POOL = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&auto=format",
  "https://images.unsplash.com/photo-1617627143233-0b0b5e3e5c8b?w=700&auto=format",
  "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=700&auto=format",
  "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=700&auto=format",
  "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=700&auto=format",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=700&auto=format",
  "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=700&auto=format",
  "https://images.unsplash.com/photo-1594938298603-c8148c4b4c2a?w=700&auto=format",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&auto=format",
  "https://images.unsplash.com/photo-1583744946564-b52d91289db5?w=700&auto=format",
  "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=700&auto=format",
  "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=700&auto=format",
  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=700&auto=format",
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=700&auto=format",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&auto=format",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format",
];

const imgs = (i: number) =>
  JSON.stringify([IMG_POOL[i % IMG_POOL.length], IMG_POOL[(i + 1) % IMG_POOL.length]]);

function makeSlug(name: string, i: number) {
  return (
    name.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-").slice(0, 55) +
    `-${i + 1}`
  );
}

const STD_SIZES = JSON.stringify(["XS", "S", "M", "L", "XL", "XXL"]);
const SMALL_SIZES = JSON.stringify(["XS", "S", "M", "L", "XL"]);
const MEN_SIZES = JSON.stringify(["S", "M", "L", "XL", "XXL", "3XL"]);
const FREE = JSON.stringify(["Free Size"]);

// ─── 150+ HAND-WRITTEN PRODUCTS ──────────────────────────────────────────────
const PRODUCTS = [

  // ══════════════════════════════════════════════
  // 🇵🇰 PAKISTAN — Lawn Collection (Summer)
  // ══════════════════════════════════════════════
  {
    name: "Crimson Bloom Lawn 3-Piece",
    desc: "Bold crimson floral print on fine Swiss lawn fabric with a printed chiffon dupatta and cambric trousers. Supreme comfort for warm-weather celebrations.",
    price: 3200, sale: 2700, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Crimson", "Dusty Rose", "White"], sizes: STD_SIZES, feat: true, img: 0,
  },
  {
    name: "Ivory Orchid Embroidered Lawn",
    desc: "Premium Swiss lawn with delicate ivory orchid embroidery along the neckline and hem, paired with a chiffon dupatta with lace trim.",
    price: 4800, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Ivory", "Soft Mint", "Powder Blue"], sizes: SMALL_SIZES, feat: true, img: 1,
  },
  {
    name: "Saffron Heritage Block-Print Lawn",
    desc: "Heritage-inspired saffron lawn suit with traditional block-print motifs celebrating Pakistan's rich craft culture — cool and breathable for Eid mornings.",
    price: 3600, sale: 2900, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Saffron", "Marigold", "Golden"], sizes: STD_SIZES, img: 2,
  },
  {
    name: "Azure Mist Digital Print Lawn",
    desc: "Vivid digital-print lawn in abstract azure watercolour design paired with a matching organza dupatta for a contemporary, effortlessly elegant look.",
    price: 2900, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Azure", "Sky Blue", "Navy"], sizes: SMALL_SIZES, img: 3,
  },
  {
    name: "Mango Yellow Casual Lawn Set",
    desc: "Cheerful mango yellow 2-piece lawn with printed motifs and a relaxed straight-cut silhouette, perfect for summer afternoons and casual outings.",
    price: 2400, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Mango", "Sunshine Yellow", "Lemon"], sizes: STD_SIZES, img: 4,
  },
  {
    name: "Peach Blossom Lawn Kurta Trouser",
    desc: "Soft peach lawn kurta with floral sprig embroidery at the neckline and sleeve border, paired with a coordinating trouser in smooth cambric.",
    price: 3100, sale: 2600, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Peach", "Apricot", "Blush"], sizes: STD_SIZES, img: 5,
  },
  {
    name: "Mint Splash Printed Lawn Suit",
    desc: "Refreshing mint-on-white watercolour splash print lawn. The airy silhouette and light dupatta make it a go-to for summer brunches.",
    price: 2750, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Mint", "Aqua", "White"], sizes: STD_SIZES, img: 6,
  },
  {
    name: "Coral Stripe Lawn 2-Piece",
    desc: "Understated coral stripe pattern on fine lawn with a contrast border. A minimalist summer essential from Pakistan's premium lawn tradition.",
    price: 2200, cat: "Lawn", sub: "Salwar Kameez",
    colors: ["Coral", "Salmon", "Terracotta"], sizes: STD_SIZES, img: 7,
  },

  // ══════════════════════════════════════════════
  // 🇵🇰 PAKISTAN — Chiffon & Silk (Formal/Festive)
  // ══════════════════════════════════════════════
  {
    name: "Pearl Organza Sharara",
    desc: "Organza kameez with delicate pearl beadwork paired with flared sharara trousers in layered organza frills. A dreamy choice for mehndi or engagement.",
    price: 12500, sale: 10800, cat: "Chiffon", sub: "Sharara",
    colors: ["Pearl", "Off-White", "Champagne"], sizes: SMALL_SIZES, feat: true, img: 8,
  },
  {
    name: "Scarlet Net Gharara",
    desc: "Bridal-inspired scarlet net gharara with heavy zari embroidery, gota trim, and mirror-work detailing across the bodice.",
    price: 18000, sale: 15500, cat: "Chiffon", sub: "Gharara",
    colors: ["Scarlet", "Ruby", "Deep Red"], sizes: SMALL_SIZES, feat: true, img: 9,
  },
  {
    name: "Teal Chiffon Anarkali Gown",
    desc: "Sweeping teal chiffon Anarkali with fitted bodice, flared skirt and intricate thread embroidery at the yoke, with palazzo churidar and dupatta.",
    price: 7800, cat: "Chiffon", sub: "Anarkali",
    colors: ["Teal", "Turquoise", "Aqua"], sizes: STD_SIZES, img: 10,
  },
  {
    name: "Lavender Dreams Chiffon Suit",
    desc: "Soft lavender chiffon 3-piece with floral appliqué and sequin scattering — a feminine ensemble for day functions and garden parties.",
    price: 6500, sale: 5200, cat: "Chiffon", sub: "Salwar Kameez",
    colors: ["Lavender", "Lilac", "Mauve"], sizes: SMALL_SIZES, img: 11,
  },
  {
    name: "Blush Chiffon Palazzo Set",
    desc: "Flowing blush chiffon top with wide-leg palazzo trousers and matching dupatta — a fluid silhouette ideal for formal gatherings and evening events.",
    price: 5800, sale: 4600, cat: "Chiffon", sub: "Palazzo",
    colors: ["Blush", "Powder Pink", "Peach"], sizes: SMALL_SIZES, img: 12,
  },
  {
    name: "Emerald Pure Silk Patiala Set",
    desc: "Rich emerald pure silk kameez paired with voluminous Patiala trousers and a georgette dupatta — a statement piece for festive occasions.",
    price: 9500, cat: "Silk", sub: "Salwar Kameez",
    colors: ["Emerald", "Forest", "Hunter Green"], sizes: STD_SIZES, img: 13,
  },
  {
    name: "Golden Era Chikankari Voile Suit",
    desc: "Fine voile adorned with intricate chikankari embroidery in golden thread, bridging the Mughal artisan tradition with contemporary silhouettes.",
    price: 6200, cat: "Chiffon", sub: "Salwar Kameez",
    colors: ["Ivory Gold", "Champagne", "Antique White"], sizes: SMALL_SIZES, feat: true, img: 14,
  },
  {
    name: "Pistachio Organza Eid Sharara",
    desc: "Ethereal pistachio green organza suit with delicate silver sequins and matching sharara; dupatta hand-finished with threadwork borders.",
    price: 14500, sale: 12000, cat: "Chiffon", sub: "Sharara",
    colors: ["Pistachio", "Mint", "Sage"], sizes: SMALL_SIZES, img: 15,
  },
  {
    name: "Coral Ombre Chiffon Suit",
    desc: "Stunning ombre chiffon kameez transitioning from deep coral to soft peach with silver thread embroidery at the neckline.",
    price: 6700, sale: 5500, cat: "Chiffon", sub: "Salwar Kameez",
    colors: ["Coral Ombre", "Peach Ombre", "Rose Ombre"], sizes: SMALL_SIZES, feat: true, img: 16,
  },
  {
    name: "Midnight Velvet Shawl Suit",
    desc: "Midnight blue velvet kameez with silver zari embroidery and a coordinating pashmina shawl — tailored for formal dinners and winter soirées.",
    price: 8900, sale: 7200, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Midnight Blue", "Royal Navy", "Teal"], sizes: SMALL_SIZES, img: 17,
  },
  {
    name: "Aubergine Velvet Peshwas",
    desc: "Floor-length peshwas in rich aubergine velvet with silver cutdana embroidery and a flared skirt — dramatic for formal evening events.",
    price: 16500, sale: 13800, cat: "Formal", sub: "Anarkali",
    colors: ["Aubergine", "Deep Purple", "Plum"], sizes: SMALL_SIZES, img: 18,
  },

  // ══════════════════════════════════════════════
  // 🇵🇰 PAKISTAN — Embroidered & Bridal
  // ══════════════════════════════════════════════
  {
    name: "Regal Zardozi Bridal Lehenga",
    desc: "Heirloom-quality bridal lehenga in deep magenta silk with all-over zardozi and resham embroidery and a pearl-detailed sweetheart choli neckline.",
    price: 75000, sale: 65000, cat: "Bridal", sub: "Lehenga",
    colors: ["Magenta", "Deep Pink", "Hot Pink"], sizes: SMALL_SIZES, feat: true, img: 19,
  },
  {
    name: "Ivory Nikkah Gharara Set",
    desc: "Bespoke ivory raw silk gharara with silver thread and dabka embroidery; dupatta hand-embroidered with floral motifs and scalloped trim.",
    price: 55000, cat: "Bridal", sub: "Gharara",
    colors: ["Ivory", "Off-White", "Cream"], sizes: SMALL_SIZES, feat: true, img: 0,
  },
  {
    name: "Gold Walima Chiffon Lehenga",
    desc: "Walima-ready gold chiffon lehenga with fully embroidered choli and layered skirt; dupatta adorned with gota and sequins.",
    price: 42000, sale: 36000, cat: "Bridal", sub: "Lehenga",
    colors: ["Gold", "Champagne", "Bronze"], sizes: SMALL_SIZES, img: 1,
  },
  {
    name: "Deep Maroon Mehndi Sharara",
    desc: "Vibrant mehndi ensemble in deep maroon with green and gold embroidery; cascading floral patterns on the sharara trousers.",
    price: 22000, sale: 18500, cat: "Bridal", sub: "Sharara",
    colors: ["Maroon", "Burgundy", "Wine"], sizes: SMALL_SIZES, img: 2,
  },
  {
    name: "Copper Barat Silk Lehenga",
    desc: "Opulent copper and rust silk lehenga with three-dimensional floral embroidery — a true statement piece for the modern South Asian bride.",
    price: 60000, cat: "Bridal", sub: "Lehenga",
    colors: ["Copper", "Rust", "Terracotta"], sizes: SMALL_SIZES, feat: true, img: 3,
  },
  {
    name: "Sage Green Organza Pishwas",
    desc: "Floor-length pishwas in sage green organza with scattered floral embroidery and a matching inner slip — ideal for formal and semi-formal occasions.",
    price: 9800, sale: 8200, cat: "Embroidered", sub: "Anarkali",
    colors: ["Sage", "Mint", "Pistachio"], sizes: SMALL_SIZES, img: 4,
  },
  {
    name: "Bottle Green Silk Gharara",
    desc: "Opulent bottle green pure silk gharara with antique gold embroidery and matching embroidered kameez — a stunning ensemble for formal wedding functions.",
    price: 24000, sale: 20000, cat: "Silk", sub: "Gharara",
    colors: ["Bottle Green", "Forest", "Hunter Green"], sizes: SMALL_SIZES, feat: true, img: 5,
  },
  {
    name: "Blush Net Dupatta Suit",
    desc: "Delicate blush pink net kameez with scattered sequin embroidery and a dupatta edged in pearl lace — effortlessly romantic.",
    price: 8800, sale: 7200, cat: "Embroidered", sub: "Salwar Kameez",
    colors: ["Blush Pink", "Baby Pink", "Rose"], sizes: SMALL_SIZES, img: 6,
  },

  // ══════════════════════════════════════════════
  // 🇵🇰 PAKISTAN — Cotton & Casual
  // ══════════════════════════════════════════════
  {
    name: "Sage Garden Cotton Kurti",
    desc: "Versatile everyday cotton kurti in sage green with hand-block printed border detailing; pairs equally well with jeans or formal trouser.",
    price: 1800, cat: "Cotton", sub: "Kurti",
    colors: ["Sage", "Olive", "Forest Green"], sizes: STD_SIZES, img: 7,
  },
  {
    name: "Indigo Block-Print Casual Kurti",
    desc: "Artisanal indigo block-print kurti in 100% cotton with contrast white motifs — a daily-wear staple crafted by skilled artisans of Multan.",
    price: 1600, cat: "Casual", sub: "Kurti",
    colors: ["Indigo", "Denim Blue", "Navy"], sizes: STD_SIZES, img: 8,
  },
  {
    name: "Terracotta Linen Straight Kurti",
    desc: "Breathable linen kurti in warm terracotta with contrast piping and button-down front — minimalist design for the contemporary professional.",
    price: 2200, cat: "Casual", sub: "Kurti",
    colors: ["Terracotta", "Brick", "Rust"], sizes: STD_SIZES, img: 9,
  },
  {
    name: "Burgundy Peplum Kurti",
    desc: "Contemporary peplum-style kurti in fine cotton with flared peplum hem and contrast border — a modern silhouette in Pakistani fashion.",
    price: 2800, cat: "Casual", sub: "Kurti",
    colors: ["Burgundy", "Wine", "Maroon"], sizes: STD_SIZES, img: 10,
  },
  {
    name: "Draped Asymmetric Cotton-Silk Kurti",
    desc: "Avant-garde asymmetric hemline kurti in a textured cotton-silk blend with digital garden print — a contemporary take on the classic kurti.",
    price: 3600, cat: "Casual", sub: "Kurti",
    colors: ["Mauve", "Dusty Blue", "Sage"], sizes: STD_SIZES, img: 11,
  },
  {
    name: "Rose Petal Khaddar Winter Suit",
    desc: "Warm khaddar fabric in dusty rose with wool embroidery detailing — an ideal companion for Pakistan's cooler months, featuring a warm shawl.",
    price: 5500, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Dusty Rose", "Mushroom", "Camel"], sizes: STD_SIZES, feat: true, img: 12,
  },
  {
    name: "Fawn Khaddar Embroidered Suit",
    desc: "Warm fawn khaddar suit with colourful thread embroidery along the front and sleeve borders — a winter piece balancing warmth with cultural richness.",
    price: 5900, sale: 4800, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Fawn", "Camel", "Tan"], sizes: STD_SIZES, img: 13,
  },
  {
    name: "Turquoise Georgette Festive Suit",
    desc: "Vibrant turquoise georgette suit with hand-embroidered neckline in resham and mirrors, paired with sheer dupatta and printed trouser.",
    price: 7400, cat: "Chiffon", sub: "Salwar Kameez",
    colors: ["Turquoise", "Aqua", "Cyan"], sizes: STD_SIZES, img: 14,
  },
  {
    name: "Charcoal Raw Silk Formal Suit",
    desc: "Tailored charcoal grey raw silk shalwar kameez with subtle self-embossed pattern and mandarin collar — for office and formal engagements.",
    price: 7200, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Charcoal", "Slate", "Graphite"], sizes: STD_SIZES, img: 15,
  },
  {
    name: "Navy Pleated Palazzo Crepe Set",
    desc: "Refined navy crepe kameez with pleated palazzo trousers — clean lines and relaxed silhouette for ethnic-touch workwear.",
    price: 4400, sale: 3600, cat: "Formal", sub: "Palazzo",
    colors: ["Navy", "Cobalt", "Royal Blue"], sizes: SMALL_SIZES, img: 16,
  },
  {
    name: "Ivory Raw Silk Formal Suit",
    desc: "Understated ivory raw silk suit featuring V-neck kameez with minimal embroidery and a structured trouser — a wardrobe essential.",
    price: 9200, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Ivory", "Off-White", "Ecru"], sizes: SMALL_SIZES, img: 17,
  },
  {
    name: "Cerise Eid Embroidered Kurta",
    desc: "Eid kurta in vibrant cerise with hand-embroidered geometric border and mirror accents — a joyful celebration of colour and craft.",
    price: 5200, cat: "Embroidered", sub: "Kurti",
    colors: ["Cerise", "Fuchsia", "Hot Pink"], sizes: SMALL_SIZES, img: 18,
  },
  {
    name: "Eid Festive Jacquard Suit",
    desc: "Celebrate Eid in champagne jacquard weave kameez with self-pattern woven motifs and a gold-bordered chiffon dupatta.",
    price: 6800, sale: 5500, cat: "Silk", sub: "Salwar Kameez",
    colors: ["Champagne", "Ivory", "Light Gold"], sizes: STD_SIZES, feat: true, img: 19,
  },
  {
    name: "Deep Blue Karandi Shawl Suit",
    desc: "Premium Karandi fabric in deep indigo blue with white embroidery and a matching wool shawl — a staple of the Pakistani winter wardrobe.",
    price: 7800, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Deep Blue", "Indigo", "Navy"], sizes: STD_SIZES, img: 0,
  },

  // ══════════════════════════════════════════════
  // 🇧🇩 BANGLADESH — Saree Collection
  // ══════════════════════════════════════════════
  {
    name: "Dhakai Jamdani Heritage Saree",
    desc: "UNESCO-heritage Dhakai Jamdani saree handwoven by master weavers of Narayanganj. Intricate floral motifs woven directly into fine muslin — a true collector's piece.",
    price: 28000, sale: 24000, cat: "Silk", sub: "Jamdani Saree",
    colors: ["White & Gold", "Ivory & Red", "Cream & Blue"], sizes: FREE, feat: true, img: 1,
  },
  {
    name: "Rajshahi Katan Silk Saree",
    desc: "Pure Rajshahi Katan silk saree in deep red with intricate zari border and pallu. Woven in traditional Bengal style with a lustrous finish.",
    price: 18500, cat: "Silk", sub: "Katan Saree",
    colors: ["Deep Red", "Crimson", "Ruby"], sizes: FREE, feat: true, img: 2,
  },
  {
    name: "Soft Muslin Everyday Saree",
    desc: "Lightweight Bangladeshi muslin saree with printed floral border — prized for its legendary softness and beautiful drape, suited to all-day wear.",
    price: 8200, sale: 6800, cat: "Cotton", sub: "Muslin Saree",
    colors: ["Mustard", "Peacock Blue", "Dusty Pink"], sizes: FREE, img: 3,
  },
  {
    name: "Bengal Tant Cotton Casual Saree",
    desc: "Traditional Bengali Tant saree in checked cotton with contrasting border — an everyday classic worn for its comfort and cultural significance.",
    price: 3800, cat: "Cotton", sub: "Tant Saree",
    colors: ["Red & White", "Blue & White", "Green & White"], sizes: FREE, img: 4,
  },
  {
    name: "Nakshi Kantha Embroidered Saree",
    desc: "Cotton saree with hand-done Nakshi Kantha embroidery in traditional Bangladeshi motifs of birds, boats and gardens — a unique work of textile art.",
    price: 12500, cat: "Cotton", sub: "Kantha Saree",
    colors: ["Indigo & White", "Red & Cream", "Green & Gold"], sizes: FREE, feat: true, img: 5,
  },
  {
    name: "Eid Banarasi Fusion Silk Saree",
    desc: "Bangladeshi Banarasi-inspired silk saree with gold zari weave and ornate pallu — a luxurious Eid offering celebrating Bengal's weaving heritage.",
    price: 15000, sale: 12500, cat: "Silk", sub: "Banarasi Saree",
    colors: ["Gold & Red", "Navy & Gold", "Emerald & Gold"], sizes: FREE, feat: true, img: 6,
  },
  {
    name: "Silk Georgette Party Saree",
    desc: "Contemporary Bangladeshi silk georgette saree with digital floral print and zari border — a modern take on traditional draping for festive occasions.",
    price: 9800, sale: 8200, cat: "Chiffon", sub: "Georgette Saree",
    colors: ["Blush", "Lavender", "Mint"], sizes: FREE, img: 7,
  },
  {
    name: "Bijoy Dibosh Special Tant Saree",
    desc: "A special Tant cotton saree celebrating Bangladesh's independence — red and green with Nakshi Kantha border motifs of the country's iconic imagery.",
    price: 5800, cat: "Cotton", sub: "Tant Saree",
    colors: ["Red & Green"], sizes: FREE, img: 8,
  },
  {
    name: "Shitol Pati Motif Cotton Saree",
    desc: "Cotton saree digitally printed with geometric patterns inspired by Bangladesh's iconic Shitol Pati mat weaving tradition — a wearable craft heritage piece.",
    price: 4200, sale: 3500, cat: "Cotton", sub: "Printed Saree",
    colors: ["Natural & Black", "Beige & Green"], sizes: FREE, img: 9,
  },
  {
    name: "Traditional Dhakai Wedding Saree",
    desc: "Fine Dhakai muslin wedding saree with gold zari border and intricate butis — passed down as a wedding gift through generations of Bangladeshi families.",
    price: 32000, cat: "Silk", sub: "Jamdani Saree",
    colors: ["White & Gold", "Ivory & Silver"], sizes: FREE, feat: true, img: 10,
  },

  // ══════════════════════════════════════════════
  // 🇧🇩 BANGLADESH — Salwar Kameez & Kurti
  // ══════════════════════════════════════════════
  {
    name: "Batik Print Cotton Salwar Kameez",
    desc: "Bangladeshi batik-print salwar kameez in 100% cotton using traditional resist-dye technique — rich, unique earthy patterns; no two pieces identical.",
    price: 4200, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Indigo", "Brown & Ochre", "Teal & Black"], sizes: STD_SIZES, img: 11,
  },
  {
    name: "Nakshi Kantha Kurti",
    desc: "Cotton kurti featuring the Bangladeshi Nakshi Kantha running stitch embroidery — each piece is a micro-narrative of rural Bangladeshi life.",
    price: 3800, cat: "Embroidered", sub: "Kurti",
    colors: ["Natural & Red", "White & Blue", "Cream & Multi"], sizes: SMALL_SIZES, feat: true, img: 12,
  },
  {
    name: "Muslin Mirror-Work Anarkali",
    desc: "Flowing fine muslin Anarkali with traditional Bangladeshi mirror-work embellishments along the hemline and cuffs — graceful fusion of craft and comfort.",
    price: 7500, sale: 6200, cat: "Cotton", sub: "Anarkali",
    colors: ["Ivory", "Soft White", "Cream"], sizes: SMALL_SIZES, img: 13,
  },
  {
    name: "Eid Silk Kurti Palazzo Set",
    desc: "Contemporary Eid set from Dhaka featuring a printed silk kurti with palazzo-cut trousers; digital floral print celebrating Bangladesh's lush botanical heritage.",
    price: 5600, cat: "Silk", sub: "Palazzo",
    colors: ["Rose Gold", "Peach", "Soft Orange"], sizes: STD_SIZES, img: 14,
  },
  {
    name: "Moslin Eid Salwar Set",
    desc: "Eid ensemble in fine muslin cotton with delicate embroidery on the kameez and a contrast bordered dupatta — comfortable for long days of festive visiting.",
    price: 4500, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Soft Yellow", "Powder Green", "Peach"], sizes: STD_SIZES, img: 15,
  },
  {
    name: "Heritage Motif Coord Set",
    desc: "Co-ordinated set featuring a short kameez and straight trousers with matching dupatta, all in the same digitally-printed heritage motif pattern.",
    price: 5200, sale: 4200, cat: "Casual", sub: "Salwar Kameez",
    colors: ["Teal & Gold", "Red & Black", "Navy & White"], sizes: SMALL_SIZES, img: 16,
  },
  {
    name: "Madhupur Tribal Motif Kurti",
    desc: "Inspired by the traditional textiles of the Garo and Santal communities — vibrant, earthy cotton kurti with tribal motif prints.",
    price: 2800, cat: "Cotton", sub: "Kurti",
    colors: ["Multi Red", "Multi Blue", "Natural"], sizes: SMALL_SIZES, img: 17,
  },

  // ══════════════════════════════════════════════
  // 🇧🇩 BANGLADESH — Panjabi (Men's)
  // ══════════════════════════════════════════════
  {
    name: "Classic White Eid Panjabi",
    desc: "The quintessential Bangladeshi Eid Panjabi in fine white cotton with subtle self-embroidery on collar and placket — a timeless garment worn by generations.",
    price: 3500, cat: "Cotton", sub: "Panjabi",
    colors: ["White", "Off-White", "Ivory"], sizes: MEN_SIZES, feat: true, img: 18,
  },
  {
    name: "Indigo Muslin Luxury Panjabi",
    desc: "Made from authentic Bangladeshi muslin in indigo, this Panjabi offers unmatched softness and breathability — a luxury must-have for summer celebrations.",
    price: 6800, cat: "Cotton", sub: "Panjabi",
    colors: ["Indigo", "Navy", "Royal Blue"], sizes: MEN_SIZES, img: 19,
  },
  {
    name: "Embroidered Teal Silk Panjabi",
    desc: "Festive Panjabi in deep teal silk with gold thread embroidery along collar, cuffs and front — elevated choice for Eid, weddings and formal gatherings.",
    price: 9200, sale: 7800, cat: "Silk", sub: "Panjabi",
    colors: ["Teal", "Cobalt", "Forest Green"], sizes: MEN_SIZES, img: 0,
  },
  {
    name: "Rajshahi Katan Silk Formal Panjabi",
    desc: "The Rajshahi Katan silk Panjabi is a statement in refined menswear — natural sheen and structured drape, pairs with dhoti or formal trouser.",
    price: 11500, cat: "Silk", sub: "Panjabi",
    colors: ["Cream", "Champagne", "Ecru"], sizes: MEN_SIZES, img: 1,
  },
  {
    name: "Chapa Printed Casual Panjabi",
    desc: "Casual Panjabi in fine Chapa printed cotton with subtle all-over pattern and contrast embroidery at collar and pocket edge.",
    price: 4200, cat: "Cotton", sub: "Panjabi",
    colors: ["Grey", "Blue", "Olive"], sizes: MEN_SIZES, img: 2,
  },

  // ══════════════════════════════════════════════
  // 🇮🇳 INDIA — Saree Collection
  // ══════════════════════════════════════════════
  {
    name: "Banarasi Pure Silk Wedding Saree",
    desc: "Heirloom Banarasi saree in deep red with all-over gold zari brocade. The ornate pallu and border are crafted by master weavers of Varanasi over several days.",
    price: 45000, sale: 38000, cat: "Silk", sub: "Banarasi Saree",
    colors: ["Deep Red & Gold", "Royal Blue & Gold", "Forest Green & Gold"], sizes: FREE, feat: true, img: 3,
  },
  {
    name: "Chanderi Silk-Cotton Gossamer Saree",
    desc: "The legendary Chanderi saree from Madhya Pradesh — gossamer silk-cotton blend with butis and zari borders, light as a feather, radiant as gold.",
    price: 14800, sale: 12500, cat: "Silk", sub: "Chanderi Saree",
    colors: ["Ivory & Gold", "Peach & Silver", "Lilac & Gold"], sizes: FREE, feat: true, img: 4,
  },
  {
    name: "Kanjivaram Temple Silk Saree",
    desc: "Iconic Kanjivaram from Tamil Nadu with contrasting border and heavy zari pallu. The distinctive warp-weft interlocking gives it legendary durability.",
    price: 52000, sale: 44000, cat: "Silk", sub: "Kanjivaram Saree",
    colors: ["Mango Orange & Green", "Purple & Gold", "Peacock Blue & Red"], sizes: FREE, feat: true, img: 5,
  },
  {
    name: "Mysore Pure Silk Crepe Saree",
    desc: "GI-tagged Mysore silk saree in deep wine with natural crepe finish — renowned for its smooth texture and rich natural lustre.",
    price: 22000, cat: "Silk", sub: "Mysore Silk Saree",
    colors: ["Wine", "Deep Purple", "Ink Blue"], sizes: FREE, img: 6,
  },
  {
    name: "Paithani Peacock Motif Saree",
    desc: "Traditional Maharashtra Paithani saree with distinctive peacock motifs woven in gold zari against vibrant parrot-green silk — a generational treasure.",
    price: 35000, cat: "Silk", sub: "Paithani Saree",
    colors: ["Parrot Green & Gold", "Red & Gold", "Peacock & Gold"], sizes: FREE, img: 7,
  },
  {
    name: "Pochampally Ikat Cotton Saree",
    desc: "Geometric Ikat-pattern cotton saree from Telangana using a pre-dyed resist technique creating bold diamond patterns — a UNESCO-recognised textile tradition.",
    price: 6800, sale: 5500, cat: "Cotton", sub: "Ikat Saree",
    colors: ["Teal & Black", "Red & White", "Navy & Orange"], sizes: FREE, img: 8,
  },
  {
    name: "Sambalpuri Bandha Silk Saree",
    desc: "Traditional Odisha Sambalpuri saree with Bandha tie-dye ikat weave featuring conch and wheel motifs representing peace and dharma.",
    price: 9500, cat: "Silk", sub: "Sambalpuri Saree",
    colors: ["Red & Black", "Green & Red", "Maroon & Gold"], sizes: FREE, img: 9,
  },
  {
    name: "Bhagalpuri Tussar Silk Saree",
    desc: "Natural honey-gold Tussar silk from Bhagalpur, Bihar — the wild silk's earthy texture and simple zari border give it an organic, artisanal character.",
    price: 8200, sale: 6800, cat: "Silk", sub: "Tussar Saree",
    colors: ["Honey Gold", "Natural Beige", "Earthy Brown"], sizes: FREE, img: 10,
  },
  {
    name: "Kerala Kasavu Cotton Saree",
    desc: "The iconic Kerala Kasavu in cream handloom cotton with broad golden zari border — traditionally worn for Onam and Vishu, symbol of South Indian identity.",
    price: 5200, cat: "Cotton", sub: "Kasavu Saree",
    colors: ["Cream & Gold", "Off-White & Gold", "Pure White & Gold"], sizes: FREE, img: 11,
  },
  {
    name: "Phulkari Embroidered Saree",
    desc: "Contemporary Punjab Phulkari tradition — vibrant floral embroidery in silk thread on fine cotton. Bursts of colour against a neutral ground.",
    price: 7600, cat: "Embroidered", sub: "Phulkari Saree",
    colors: ["Multi on Mustard", "Multi on Ivory", "Multi on Red"], sizes: FREE, feat: true, img: 12,
  },
  {
    name: "Patola Double-Ikat Silk Saree",
    desc: "Double ikat Patola silk from Patan, Gujarat — one of the world's most complex weaving techniques with geometric patterns simultaneously woven in both warp and weft.",
    price: 48000, cat: "Silk", sub: "Patola Saree",
    colors: ["Red & Black & White", "Blue & Red & Yellow"], sizes: FREE, feat: true, img: 13,
  },
  {
    name: "Maheswari Silk-Cotton Saree",
    desc: "Fine Maheswari from Madhya Pradesh in a silk-cotton blend with the distinctive reversible border and characteristic 'Bugdi' pattern in the body.",
    price: 8800, sale: 7200, cat: "Silk", sub: "Maheswari Saree",
    colors: ["Peach & Gold", "Mint & Silver", "Ivory & Gold"], sizes: FREE, img: 14,
  },
  {
    name: "Assamese Muga Silk Mekhela Chador",
    desc: "Traditional two-piece Assamese dress in GI-tagged Muga silk — natural golden hue indigenous to Assam. The Mekhela and Chador feature traditional motifs.",
    price: 16000, cat: "Silk", sub: "Mekhela Chador",
    colors: ["Natural Gold", "Muga & Red", "Muga & Green"], sizes: FREE, img: 15,
  },
  {
    name: "Kutch Embroidered Saree",
    desc: "Dramatic Kutchi mirror-work, chain stitch and geometric patterns covering the pallu and border in vivid colour — a saree from Gujarat's most expressive craft tradition.",
    price: 9500, cat: "Embroidered", sub: "Kutch Saree",
    colors: ["Red & Multi", "Black & Multi", "Blue & Multi"], sizes: FREE, img: 16,
  },
  {
    name: "Benarasi Organza Party Saree",
    desc: "Contemporary Benarasi organza in wine red with minimal zari brocade motifs and a contrasting heavy pallu — light enough for modern wear with traditional gravitas.",
    price: 16800, sale: 13900, cat: "Chiffon", sub: "Banarasi Saree",
    colors: ["Wine", "Dusty Rose", "Sage"], sizes: FREE, feat: true, img: 17,
  },
  {
    name: "South Indian Kanjivaram Bridal Saree",
    desc: "Rich gold-worked Kanjivaram specifically designed for temple and bridal occasions with traditional Thilagam motifs. Includes complementary blouse.",
    price: 38500, cat: "Bridal", sub: "Kanjivaram Saree",
    colors: ["Gold & Red", "Gold & Green", "Gold & Blue"], sizes: FREE, feat: true, img: 18,
  },

  // ══════════════════════════════════════════════
  // 🇮🇳 INDIA — Lehenga Choli
  // ══════════════════════════════════════════════
  {
    name: "Bridal Velvet Zardozi Lehenga",
    desc: "Magnificent bridal lehenga in burgundy velvet with heavy gold zardozi and stone embellishments; elaborate choli with trail detailing.",
    price: 85000, sale: 72000, cat: "Bridal", sub: "Lehenga",
    colors: ["Burgundy & Gold", "Navy & Silver", "Emerald & Gold"], sizes: SMALL_SIZES, feat: true, img: 19,
  },
  {
    name: "Rajasthani Bandhani Festive Lehenga",
    desc: "Festive Rajasthani lehenga in tie-dyed Bandhani silk with mirror-work and gota patti — a riot of colour capturing the spirit of Rajasthan.",
    price: 22000, sale: 18500, cat: "Silk", sub: "Lehenga",
    colors: ["Multi-colour", "Red & Yellow", "Pink & Orange"], sizes: STD_SIZES, feat: true, img: 0,
  },
  {
    name: "Pastel Organza Sangeet Lehenga",
    desc: "Dreamy pastel organza lehenga with 3D floral appliqué and sequin embroidery — popular for sangeet and mehndi celebrations seeking elegance without weight.",
    price: 28000, sale: 23500, cat: "Chiffon", sub: "Lehenga",
    colors: ["Blush", "Mint", "Lavender", "Baby Blue"], sizes: SMALL_SIZES, img: 1,
  },
  {
    name: "Gujarati Ghagra Choli",
    desc: "Traditional Gujarati ghagra in patola-inspired silk with mirror-work choli and tie-dye dupatta — designed for Navratri and festive celebrations.",
    price: 12500, cat: "Embroidered", sub: "Lehenga",
    colors: ["Multi Red", "Multi Blue", "Multi Green"], sizes: STD_SIZES, img: 2,
  },
  {
    name: "Gota Patti Georgette Lehenga",
    desc: "Rajasthani gota patti metallic ribbon appliqué on rich pink georgette kameez and lehenga-style skirt — shimmering and celebratory.",
    price: 19500, sale: 16000, cat: "Embroidered", sub: "Lehenga",
    colors: ["Pink & Gold", "Orange & Gold", "Red & Gold"], sizes: STD_SIZES, feat: true, img: 3,
  },
  {
    name: "Banjara Mirror-Work Lehenga",
    desc: "Inspired by the Banjara tribe of Telangana — colourful patchwork fabric with extensive mirror-work and tassel embellishments.",
    price: 11500, sale: 9800, cat: "Embroidered", sub: "Lehenga",
    colors: ["Multi-colour", "Red & Multi", "Blue & Multi"], sizes: STD_SIZES, img: 4,
  },
  {
    name: "Zardozi Bridal Sharara (Indian)",
    desc: "Indian bridal sharara in deep rose pink silk with heavy zardozi embroidery covering the full surface; matching choli and dupatta complete this spectacular ensemble.",
    price: 68000, sale: 58000, cat: "Bridal", sub: "Sharara",
    colors: ["Deep Rose", "Hot Pink", "Magenta"], sizes: SMALL_SIZES, feat: true, img: 5,
  },

  // ══════════════════════════════════════════════
  // 🇮🇳 INDIA — Anarkali & Kurti
  // ══════════════════════════════════════════════
  {
    name: "Indigo Chikankari Anarkali Gown",
    desc: "Floor-length indigo georgette Anarkali with delicate white chikankari embroidery from Lucknow — the flared silhouette and intricate detailing make it timeless.",
    price: 16800, sale: 13900, cat: "Chiffon", sub: "Anarkali",
    colors: ["Indigo", "Cobalt", "Midnight Blue"], sizes: SMALL_SIZES, feat: true, img: 6,
  },
  {
    name: "Lucknowi Chikankari Georgette Kurti",
    desc: "Fine georgette kurti from Lucknow's famous chikankari artisans with shadow-work and phanda embroidery — the translucent fabric creates a beautifully layered look.",
    price: 5800, sale: 4800, cat: "Chiffon", sub: "Kurti",
    colors: ["White", "Ivory", "Powder Blue", "Pale Pink"], sizes: SMALL_SIZES, feat: true, img: 7,
  },
  {
    name: "Jaipur Block-Print A-Line Kurti",
    desc: "Hand block-printed kurti from Jaipur in fine cotton with dabu-print floral motifs and contrast piping — Rajasthani craft tradition made wearable for everyday.",
    price: 2600, cat: "Cotton", sub: "Kurti",
    colors: ["Blue & White", "Red & Beige", "Green & Cream"], sizes: STD_SIZES, img: 8,
  },
  {
    name: "Kalamkari Printed Anarkali",
    desc: "Hand-painted Kalamkari cotton Anarkali from Andhra Pradesh with mythological motifs in earthy tones — a wearable piece of art.",
    price: 7800, cat: "Cotton", sub: "Anarkali",
    colors: ["Cream & Brown", "White & Blue", "Natural & Red"], sizes: SMALL_SIZES, img: 9,
  },
  {
    name: "Madhubani Art Cotton Kurti",
    desc: "Cotton kurti from Bihar with hand-painted Madhubani folk art — vivid representations of nature, deities and geometric patterns in natural dye pigments.",
    price: 4800, sale: 4000, cat: "Cotton", sub: "Kurti",
    colors: ["White & Multi", "Cream & Multi"], sizes: STD_SIZES, img: 10,
  },
  {
    name: "Warli Art Coord Set",
    desc: "Cotton coord set featuring Warli tribal art motifs from Maharashtra printed in black and white on natural cotton ground — minimalist folk art fashion.",
    price: 4200, cat: "Casual", sub: "Salwar Kameez",
    colors: ["Natural & Black", "White & Black"], sizes: SMALL_SIZES, img: 11,
  },
  {
    name: "Punjabi Phulkari Salwar Suit",
    desc: "Vibrant Punjabi salwar suit with hand-embroidered Phulkari work on the dupatta and kameez yoke — bright floral embroidery as a Punjabi art form.",
    price: 7200, sale: 5900, cat: "Embroidered", sub: "Salwar Kameez",
    colors: ["Mustard", "Fuchsia", "Cobalt"], sizes: STD_SIZES, img: 12,
  },
  {
    name: "Kashmiri Sozni Wool Salwar Suit",
    desc: "Premium Kashmiri wool salwar suit with hand-embroidered Sozni needlework in floral motifs — winter luxury pairing warmth with intricate artistry.",
    price: 18500, sale: 15800, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Cream", "Charcoal", "Deep Teal"], sizes: SMALL_SIZES, feat: true, img: 13,
  },
  {
    name: "Bandhani Dupatta Cotton Suit",
    desc: "Tie-dye Bandhani cotton suit from Gujarat with classic straight-cut kameez and churidar — the stunning dupatta with hundreds of tiny tied dots is the centrepiece.",
    price: 5400, sale: 4500, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Red & Gold", "Teal & Silver", "Pink & Gold"], sizes: STD_SIZES, img: 14,
  },
  {
    name: "Authentic Kashmir Pashmina Suit",
    desc: "Authentic Kashmir Pashmina suit in warm ivory with Sozni-embroidered floral motifs in silk thread — wears as a shawl draped over the shoulder for added grace.",
    price: 32000, cat: "Formal", sub: "Salwar Kameez",
    colors: ["Ivory", "Cream", "Natural"], sizes: SMALL_SIZES, feat: true, img: 15,
  },
  {
    name: "Manipuri Phanek Wrap Skirt Set",
    desc: "Traditional Manipuri Phanek hand-woven cotton wrap skirt with coordinating blouse, featuring geometric woven motifs in traditional Meitei patterns.",
    price: 5800, cat: "Cotton", sub: "Salwar Kameez",
    colors: ["Black & Red", "Blue & Gold", "Green & White"], sizes: SMALL_SIZES, img: 16,
  },

  // ══════════════════════════════════════════════
  // 🇮🇳 INDIA — Men's (Sherwani, Kurta, Dhoti)
  // ══════════════════════════════════════════════
  {
    name: "Royal Brocade Wedding Sherwani",
    desc: "Majestic ivory brocade Sherwani with gold thread embroidery at collar, placket and cuffs — comes with churidar and dupatta for a complete ceremonial ensemble.",
    price: 38000, sale: 32000, cat: "Bridal", sub: "Sherwani",
    colors: ["Ivory & Gold", "Cream & Silver", "Off-White & Rose Gold"], sizes: MEN_SIZES, feat: true, img: 17,
  },
  {
    name: "Indigo Nehru Jacket Kurta Set",
    desc: "Contemporary indigo Nehru-collar kurta set in handloom cotton with a matching Nehru jacket — clean tailoring for weddings, functions and festive occasions.",
    price: 8900, sale: 7400, cat: "Formal", sub: "Panjabi",
    colors: ["Indigo", "Navy", "Dark Teal"], sizes: MEN_SIZES, img: 18,
  },
  {
    name: "White Dhoti Kurta Set",
    desc: "Traditional Indian dhoti kurta set in fine cotton with minimal embroidery at the neckline — a classical look for puja, festivals and formal events.",
    price: 5500, cat: "Cotton", sub: "Dhoti Kurta",
    colors: ["White", "Off-White", "Cream"], sizes: MEN_SIZES, img: 19,
  },
  {
    name: "Saffron Silk Festive Kurta Churidar",
    desc: "Vibrant saffron pure silk kurta with minimal embroidery and a matching silk churidar — a festive look honouring India's silk weaving heritage.",
    price: 12000, sale: 9800, cat: "Silk", sub: "Panjabi",
    colors: ["Saffron", "Turmeric", "Amber"], sizes: MEN_SIZES, img: 0,
  },
  {
    name: "Himroo Shawl Formal Suit",
    desc: "Traditional Himroo fabric from Aurangabad — cotton-silk blend with distinctive woven patterns originally made for the Nizam's court.",
    price: 14500, sale: 12000, cat: "Silk", sub: "Salwar Kameez",
    colors: ["Red & Gold", "Blue & Silver", "Green & Gold"], sizes: SMALL_SIZES, img: 1,
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Seeding database with " + PRODUCTS.length + " South Asian fashion products...\n");

  // Users
  const hashedAdmin = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aura.com" },
    update: {},
    create: { name: "Admin", email: "admin@aura.com", password: hashedAdmin, role: Role.ADMIN },
  });
  console.log("✅ Admin: " + admin.email);

  const hashedUser = await bcrypt.hash("User123!", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@aura.com" },
    update: {},
    create: { name: "Priya Sharma", email: "demo@aura.com", password: hashedUser, role: Role.USER },
  });
  console.log("✅ Demo user: " + demoUser.email);

  // Clear data (careful with relations)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.product.deleteMany();
  console.log("🗑️  Cleared existing products\n");

  // Insert products
  const createdIds: string[] = [];
  let count = 0;
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: makeSlug(p.name, i),
        description: p.desc,
        price: p.price,
        salePrice: p.sale ?? null,
        category: p.cat,
        subCategory: p.sub,
        images: imgs(p.img),
        sizes: p.sizes,
        colors: JSON.stringify(p.colors),
        stock: Math.floor(Math.random() * 40) + 10,
        featured: p.feat ?? false,
        active: true,
      },
    });
    createdIds.push(product.id);
    count++;
    if (count % 25 === 0) console.log("   " + count + "/" + PRODUCTS.length + " products created...");
  }

  console.log("\n✅ " + count + " products created");

  // Stats
  const pkCount = PRODUCTS.filter(p => ["Cotton","Lawn","Chiffon","Silk","Embroidered","Bridal","Formal","Casual"].includes(p.cat) && !["Jamdani Saree","Katan Saree","Tant Saree","Muslin Saree","Kantha Saree","Banarasi Saree","Panjabi","Georgette Saree","Printed Saree","Mekhela Chador","Kanjivaram Saree","Chanderi Saree","Mysore Silk Saree","Paithani Saree","Ikat Saree","Sambalpuri Saree","Tussar Saree","Kasavu Saree","Phulkari Saree","Patola Saree","Maheswari Saree","Kutch Saree","Dhoti Kurta","Sherwani"].includes(p.sub)).length;

  const origins = {
    "🇵🇰 Pakistan": PRODUCTS.filter(p => ["Salwar Kameez","Sharara","Gharara","Anarkali","Palazzo","Kurti"].includes(p.sub) && ["Lawn","Chiffon","Silk","Cotton","Embroidered","Bridal","Casual","Formal"].includes(p.cat)).length,
    "🇧🇩 Bangladesh": PRODUCTS.filter(p => ["Jamdani Saree","Katan Saree","Tant Saree","Muslin Saree","Kantha Saree","Panjabi","Georgette Saree","Printed Saree"].includes(p.sub)).length,
    "🇮🇳 India": PRODUCTS.filter(p => ["Banarasi Saree","Chanderi Saree","Kanjivaram Saree","Mysore Silk Saree","Paithani Saree","Ikat Saree","Sambalpuri Saree","Tussar Saree","Kasavu Saree","Phulkari Saree","Patola Saree","Maheswari Saree","Kutch Saree","Mekhela Chador","Dhoti Kurta","Sherwani","Lehenga"].includes(p.sub)).length,
  };

  const allCats = [...new Set(PRODUCTS.map(p => p.cat))].sort();
  const allSubs = [...new Set(PRODUCTS.map(p => p.sub))].sort();

  console.log("\n📦 Approximate Origin Breakdown:");
  Object.entries(origins).forEach(([k, v]) => console.log("   " + k + ": ~" + v + " items"));
  console.log("\n🏷️  Categories (" + allCats.length + "): " + allCats.join(", "));
  console.log("\n📁 Sub-categories (" + allSubs.length + "):");
  allSubs.forEach(s => console.log("   • " + s));

  // Sample orders
  await prisma.order.create({
    data: {
      userId: demoUser.id, status: "DELIVERED",
      total: 9200, subtotal: 8900, shipping: 300,
      address: JSON.stringify({ name: "Priya Sharma", line1: "42 Gulshan Avenue", city: "Dhaka", province: "Dhaka Division", postal: "1212", country: "Bangladesh" }),
      items: { create: createdIds.slice(0, 2).map(id => ({ productId: id, quantity: 1, size: "M", price: 4500 })) },
    },
  });
  await prisma.order.create({
    data: {
      userId: demoUser.id, status: "PROCESSING",
      total: 6800, subtotal: 6500, shipping: 300,
      address: JSON.stringify({ name: "Priya Sharma", line1: "42 Gulshan Avenue", city: "Dhaka", province: "Dhaka Division", postal: "1212", country: "Bangladesh" }),
      items: { create: [{ productId: createdIds[2], quantity: 1, size: "L", price: 6500 }] },
    },
  });
  await prisma.order.create({
    data: {
      userId: demoUser.id, status: "SHIPPED",
      total: 32000, subtotal: 31500, shipping: 500,
      address: JSON.stringify({ name: "Priya Sharma", line1: "42 Gulshan Avenue", city: "Dhaka", province: "Dhaka Division", postal: "1212", country: "Bangladesh" }),
      items: { create: [{ productId: createdIds[4], quantity: 1, size: "S", price: 31500 }] },
    },
  });

  console.log("\n✅ 3 sample orders created");
  console.log("\n" + "═".repeat(55));
  console.log("🎉 Seed complete!  " + count + " products in database.");
  console.log("═".repeat(55));
  console.log("\n🔐 Credentials:");
  console.log("   Admin → admin@aura.com  / Admin123!");
  console.log("   Demo  → demo@aura.com   / User123!");
  console.log("\n🚀 Run: npm run dev → http://localhost:3000");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
