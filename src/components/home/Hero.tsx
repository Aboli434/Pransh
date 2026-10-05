'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const zoomY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "30%"]);
  const zoomScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-40%"]);
  const smallTextX = useTransform(scrollYProgress, [0, 1], ["0px", prefersReducedMotion ? "0px" : "100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Using CSS perspective for depth
  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-ivory)] perspective-[1000px]"
    >
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute inset-0 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12 transform-style-3d z-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full h-full relative">
          
          {/* Typographic Object */}
          <div className="absolute top-[25vh] md:top-[15vh] lg:top-auto lg:bottom-[5vh] left-0 md:left-12 z-20 pointer-events-none translate-z-[40px]">
            <h1 className="text-[12vw] md:text-[140px] leading-[0.85] font-serif text-[var(--color-charcoal)] mix-blend-difference tracking-tighter">
              <span className="block text-[var(--color-ivory)]">GROWN</span>
              <span className="block text-[6vw] md:text-[80px] italic font-light ml-[10vw] md:ml-[120px] text-[var(--color-champagne)]">WITH</span>
              <span className="block text-[var(--color-ivory)]">PURPOSE.</span>
            </h1>
          </div>

          {/* Main Editorial Image */}
          <motion.div 
            style={{ y: zoomY, scale: zoomScale }}
            className="absolute top-[10vh] md:top-[5vh] right-0 md:right-[5vw] w-[100vw] md:w-[70vw] lg:w-[50vw] h-[60vh] md:h-[80vh] z-10 translate-z-[-20px] origin-top"
          >
            <Image 
              src="/images/hero/hero-landscape.jpg"
              alt="Farmer in the field"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            {/* Subtle photographic overlay */}
            <div className="absolute inset-0 bg-[var(--color-earth-brown)]/10 mix-blend-overlay"></div>
          </motion.div>

          {/* Editorial Metadata */}
          <motion.div 
            style={{ x: smallTextX }}
            className="absolute bottom-0 right-0 md:right-12 z-30 translate-z-[80px] max-w-[200px] text-right"
          >
            <p className="text-[var(--color-charcoal)] font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-2 mix-blend-difference">
              From the Land
            </p>
            <p className="text-[var(--color-charcoal)]/60 font-serif italic text-lg mix-blend-difference">
              To your table
            </p>
            <p className="text-xs text-[var(--color-charcoal)] mt-4 font-light mix-blend-difference leading-relaxed">
              {dict.hero.description}
            </p>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
