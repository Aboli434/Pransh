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
      
      {/* HTML Typographic Layer */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 md:p-12 z-10 pointer-events-none mix-blend-difference text-[var(--color-ivory)]"
      >
        {/* Top */}
        <div className="flex justify-between items-start w-full mt-24 md:mt-0">
          <div className="text-sm font-sans tracking-[0.4em] uppercase">PRANSH</div>
        </div>

        {/* Center / Left */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[12vw] md:text-[130px] leading-[0.85] font-serif tracking-tighter mb-8">
            <span className="block">GROWN</span>
            <span className="block text-[var(--color-champagne)] italic font-light">WITH</span>
            <span className="block">PURPOSE.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-xs font-sans uppercase tracking-widest opacity-80">
            <span>INDRAYANI RICE</span>
            <span className="hidden md:inline">•</span>
            <span>DIRECT FROM THE FARM</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-0 pointer-events-auto">
          <Link 
            href={`/${locale}/journey`}
            className="text-xs font-sans uppercase tracking-[0.2em] border-b border-[var(--color-ivory)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
          >
            EXPLORE THE JOURNEY
          </Link>

          <div className="text-right text-xs font-sans uppercase tracking-[0.2em] opacity-80 leading-relaxed">
            <span className="block">PAVNANAGAR</span>
            <span className="block">MAHARASHTRA</span>
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
