'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { productsData } from '@/data/products';
import Container from '@/components/ui/Container';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OurRiceClient({ dict }: { locale: Locale, dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <main className="pt-32 pb-32 bg-[var(--color-ivory)] min-h-screen overflow-hidden">
      <Container className="relative">
        <div 
          ref={containerRef}
          className="relative max-w-[1400px] mx-auto min-h-[80vh] flex items-center justify-center [perspective:2000px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Macro Image */}
          <motion.div 
            className="absolute inset-0 w-full h-full lg:w-[85%] lg:left-[7.5%] z-0"
            animate={{ 
              scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
              rotateX: isHovered && !prefersReducedMotion ? 2 : 0,
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full h-full shadow-2xl">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <motion.div 
                className="absolute inset-0 bg-[var(--color-champagne)] mix-blend-overlay pointer-events-none"
                animate={{ opacity: isHovered ? 0.3 : 0.1 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-[var(--color-charcoal)]/30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Floating Detail Grain Image */}
          <motion.div 
            className="absolute right-[5%] bottom-[15%] w-48 h-64 z-10 hidden lg:block border-4 border-[var(--color-ivory)] shadow-2xl"
            animate={{ 
              y: isHovered && !prefersReducedMotion ? -30 : 0,
              x: isHovered && !prefersReducedMotion ? -10 : 0,
              rotateZ: isHovered && !prefersReducedMotion ? 4 : 0,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <Image 
              src="/images/rice/rice-grain-macro.jpg"
              alt="Rice Grain Detail"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Floating Editorial Information Card */}
          <motion.div 
            className="absolute bottom-0 md:bottom-12 left-4 right-4 md:left-12 md:right-auto md:w-[500px] bg-[var(--color-ivory)]/80 backdrop-blur-xl border border-[var(--color-ivory)] p-8 md:p-12 shadow-2xl z-20"
            animate={{ 
              y: isHovered && !prefersReducedMotion ? -10 : 0,
              translateZ: 100
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-terracotta)]">
                {dict.riceProduct.eyebrow}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif text-[var(--color-charcoal)] mb-2 tracking-tighter">
              {product.name}.
            </h1>
            <h2 className="text-2xl font-serif text-[var(--color-champagne)] italic mb-8">
              {product.variety}
            </h2>
            
            <p className="text-[var(--color-charcoal)]/80 font-light leading-relaxed mb-8 text-balance">
              {product.description}
            </p>

            <div className="border-t border-[var(--color-charcoal)]/10 pt-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)]/60 mb-2">Availability</h3>
              <p className="text-[var(--color-charcoal)] font-medium">{product.availability}</p>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </main>
  );
}
