'use client'
// components/HeroSlider.tsx
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1600&q=90',
    label: 'New Season 2025',
    title: 'Crafted for the\nModern Woman',
    subtitle: 'Premium Lawn & Khaddar Collections',
    cta: 'Explore Collection',
    href: '/products',
    align: 'left',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=90',
    label: 'Festive Pret',
    title: 'Ready to Wear\nReady to Shine',
    subtitle: 'Occasion Wear Delivered Across Bangladesh',
    cta: 'Shop Pret',
    href: '/products?category=Ready-to-Wear',
    align: 'center',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600&q=90',
    label: 'Unstitched',
    title: 'The Art of\nTimeless Elegance',
    subtitle: 'Three-Piece Suits in Premium Fabrics',
    cta: 'Shop Unstitched',
    href: '/products?category=Unstitched',
    align: 'right',
  },
]

export default function HeroSlider() {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let swiper: any = null

    const init = async () => {
      const { Swiper } = await import('swiper')
      const { Navigation, Pagination, Autoplay, EffectFade } = await import('swiper/modules')

      // Import CSS
      await import('swiper/css')
      await import('swiper/css/effect-fade')
      await import('swiper/css/pagination')

      if (!swiperRef.current) return

      swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.hero-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        },
      })
    }

    init()

    return () => {
      if (swiper && swiper.destroy) swiper.destroy(true, true)
    }
  }, [])

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <div ref={swiperRef} className="swiper w-full h-full">
        <div className="swiper-wrapper">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="swiper-slide relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
                quality={90}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

              {/* Content */}
              <div
                className={`absolute inset-0 flex items-center px-8 md:px-20 lg:px-32 ${
                  slide.align === 'center'
                    ? 'justify-center text-center'
                    : slide.align === 'right'
                    ? 'justify-end text-right'
                    : 'justify-start text-left'
                }`}
              >
                <div className="text-white max-w-xl animate-fade-in">
                  <span className="text-[10px] tracking-[0.4em] uppercase font-body text-aura-gold-light mb-4 block">
                    {slide.label}
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 text-balance whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="font-body text-sm md:text-base text-white/80 mb-8 tracking-wide">
                    {slide.subtitle}
                  </p>
                  <Link href={slide.href} className="btn-outline border-white text-white hover:bg-white hover:text-aura-black inline-block">
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="square"/>
          </svg>
        </button>
        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="square"/>
          </svg>
        </button>

        {/* Pagination */}
        <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center" />
      </div>
    </section>
  )
}
