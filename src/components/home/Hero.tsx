'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import Link from 'next/link';
import PranshHeroScene from '../three/PranshHeroScene';

export default function Hero({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = -rect.top / rect.height;
      scrollRef.current = Math.max(0, Math.min(1, progress));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-charcoal)]"
    >
      {/* Real WebGL 3D Layer */}
      {mounted && <PranshHeroScene scrollProgress={scrollRef} />}
      
      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-[var(--color-charcoal)]/30 z-[5] pointer-events-none mix-blend-multiply" />
      
      {/* HTML Typographic Layer */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 md:p-12 z-10 pointer-events-none text-[var(--color-ivory)]"
      >
        {/* Top */}
        <div className="flex justify-between items-start w-full mt-24 md:mt-0">
          <div className="text-sm font-sans tracking-[0.4em] uppercase text-[var(--color-champagne)]">
            FROM THE FARM
          </div>
        </div>

        {/* Center / Left */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <h1 className="text-[12vw] md:text-[100px] lg:text-[120px] leading-[0.9] font-serif tracking-tighter mb-6 drop-shadow-lg">
            INDRAYANI RICE
          </h1>
          <p className="text-base md:text-lg font-sans font-light opacity-90 max-w-xl leading-relaxed mb-10 drop-shadow-sm">
            Grown by a farmer in Pavnanagar, PRANSH brings the journey of rice from the field to the grain on your table.
          </p>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto">
            <Link 
              href={`/${locale}/contact`}
              className="bg-[var(--color-champagne)] text-[var(--color-charcoal)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-ivory)] transition-colors"
            >
              ENQUIRE TO ORDER
            </Link>
            <Link 
              href={`/${locale}/journey`}
              className="text-xs font-sans uppercase tracking-[0.2em] border-b border-[var(--color-ivory)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
            >
              EXPLORE THE JOURNEY
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-0 mt-8">
          <div className="text-xs font-sans uppercase tracking-[0.2em] opacity-90 text-[var(--color-champagne)] font-medium">
            10 KG · 25 KG PACKING
          </div>

          <div className="text-left md:text-right text-xs font-sans uppercase tracking-[0.2em] opacity-80 leading-relaxed">
            <span className="block">PAVNANAGAR, MAHARASHTRA</span>
          </div>
        </div>
      </motion.div>
      
      {/* Loading Fallback State */}
      {!mounted && (
        <div className="absolute inset-0 bg-[var(--color-charcoal)] z-0 flex items-center justify-center text-[var(--color-ivory)]">
          <span className="font-serif tracking-[0.3em] uppercase text-sm animate-pulse">PRANSH</span>
        </div>
      )}
    </section>
  );
}
