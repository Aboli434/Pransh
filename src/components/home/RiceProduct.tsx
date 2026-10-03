'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { productsData } from '@/data/products';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function RiceProduct({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ["20%", prefersReducedMotion ? "0%" : "-20%"]);
  
  // We explicitly use Indrayani Rice data
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <section id="rice" ref={containerRef} className="py-24 md:py-32 lg:py-40 bg-[var(--color-warm-beige)] overflow-hidden relative">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Visual Presentation */}
          <div className="w-full lg:w-3/5 relative aspect-square md:aspect-[4/3] lg:aspect-[16/10] bg-[var(--color-charcoal)] rounded-sm overflow-hidden group">
            <Image 
              src={product.image}
              alt={product.name}
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            
            {/* Floating Product Card (3D Parallax Effect) */}
            <motion.div 
              style={{ y: cardY }}
              className="absolute right-8 bottom-8 md:right-12 md:bottom-12 bg-[var(--color-ivory)]/90 backdrop-blur-md p-6 md:p-8 shadow-2xl max-w-xs border border-[var(--color-ivory)]"
            >
              <h3 className="text-2xl font-serif text-[var(--color-charcoal)] mb-1">{product.name}</h3>
              <p className="text-sm font-semibold tracking-widest text-[var(--color-champagne)] mb-4">{product.variety}</p>
              <Link href={`/${locale}/our-rice`} className="text-xs uppercase tracking-widest text-[var(--color-charcoal)] hover:text-[var(--color-champagne)] transition-colors flex items-center gap-2">
                Discover More <span>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/5">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
                {dict.riceProduct.eyebrow}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--primary)] mb-8 leading-[1.1]">
              Indrayani Rice. <br />
              <span className="text-[var(--color-sage)] italic font-light">इंद्रायणी तांदूळ</span>
            </h2>
            
            <p className="text-lg text-[var(--color-charcoal)]/80 font-light mb-10 text-balance leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex gap-4">
              <Link href={`/${locale}/our-rice`}>
                <Button variant="primary">Explore Indrayani Rice</Button>
              </Link>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
