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
      const maxScroll = rect.height - window.innerHeight;
      
      // Calculate scroll progress from 0 (top) to 1 (bottom of the container)
      // Since container is relative to viewport, when top is 0, progress is 0.
      // When top is -maxScroll, progress is 1.
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;
      scrollRef.current = progress;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"] // 0 when top hits top, 1 when bottom hits top
  });

  const opacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] md:h-[300vh] w-full bg-[#1c1814]"
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Cinematic Agricultural Background - Resolves the Black Void */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2b2216]" /> {/* Fallback color */}
          <img 
            src="/images/hero/hero-bg.jpg"
            alt="Agricultural Farm"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Warm atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1814] via-transparent to-[#4a3928] opacity-60 mix-blend-multiply pointer-events-none" />
        </div>
        
        {/* Real WebGL 3D Layer */}
        {mounted && <PranshHeroScene scrollProgress={scrollRef} />}
        
        {/* Readability Overlay - Fades out at the end so the camera fly-through is clean */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/40 to-transparent z-[5] pointer-events-none mix-blend-multiply" 
        />
        
        {/* HTML Typographic Layer */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 md:p-12 z-10 pointer-events-none text-[var(--color-ivory)]"
        >
          {/* Top */}
          <div className="flex justify-between items-start w-full mt-24 md:mt-0">
            <div className="text-sm font-sans tracking-[0.4em] uppercase text-[var(--color-champagne)] drop-shadow-md font-semibold">
              FROM THE FARM
            </div>
          </div>

          {/* Center / Left */}
          <div className="flex-1 flex flex-col justify-center max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-[12vw] md:text-[80px] lg:text-[100px] leading-[0.9] font-serif tracking-tighter mb-6 drop-shadow-xl text-[var(--color-ivory)]">
              INDRAYANI RICE
            </h1>
            <p className="text-base md:text-lg font-sans font-light opacity-100 max-w-md md:max-w-xl leading-relaxed mb-10 drop-shadow-md text-[var(--color-ivory)]/90">
              Grown by a farmer in Pavnanagar, PRANSH brings the journey of rice from the field to the grain on your table.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto">
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-champagne)] text-[var(--color-charcoal)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-ivory)] transition-colors shadow-lg"
              >
                ENQUIRE TO ORDER
              </a>
              <Link 
                href={`/${locale}/journey`}
                className="text-xs font-sans uppercase tracking-[0.2em] border-b border-[var(--color-ivory)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors drop-shadow-md font-semibold"
              >
                EXPLORE THE JOURNEY
              </Link>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-0 mt-8 drop-shadow-md">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[var(--color-champagne)] font-bold">
              10 KG · 25 KG PACKING
            </div>

            <div className="text-left md:text-right text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-ivory)]/90">
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

      </div>
    </section>
  );
}
