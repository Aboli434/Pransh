'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Locale } from '@/i18n/config';
import Link from 'next/link';
import PranshHeroScene from '../three/PranshHeroScene';

export default function Hero({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;
      scrollRef.current = progress;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] md:h-[300vh] w-full bg-[#d6ccbd]"
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Real WebGL 3D Layer - Cinematic Rice Field */}
        {mounted && <PranshHeroScene scrollProgress={scrollRef} />}
        
        {/* Stronger readability gradient to make white text pop */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/80 via-[#1a1714]/30 to-transparent z-[5] pointer-events-none" 
        />
        
        {/* HTML Typographic Layer - Premium Editorial */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-16 md:pl-24 z-10 pointer-events-none text-[#f2ede4]"
        >
          {/* PRANSH Brand Mark - Top Left or Absolute */}
          <div className="absolute top-8 left-6 md:top-12 md:left-12 lg:left-24">
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-white font-bold opacity-80">
              PRANSH
            </span>
          </div>

          <div className="max-w-xl md:max-w-2xl mt-16 md:mt-0">
            {/* Small eyebrow */}
            <div className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-[#f2ede4]/80 font-medium mb-6">
              MAVAL · PAVNANAGAR
            </div>
            
            {/* Large serif */}
            <h1 
              className="text-6xl md:text-8xl lg:text-[110px] leading-[0.9] font-serif tracking-tighter mb-8 text-white drop-shadow-lg"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              INDRAYANI<br/>RICE
            </h1>
            
            {/* Small supporting line */}
            <div className="text-sm md:text-base font-serif italic text-[#f2ede4]/90 mb-12 max-w-sm">
              From the farm to your table.
            </div>
            
            {/* Refined price line */}
            <div className="text-[11px] md:text-xs font-sans uppercase tracking-[0.3em] font-medium text-white/90 mb-10 flex items-center gap-4">
              <span>10 KG — ₹600</span>
              <span className="opacity-50">·</span>
              <span>25 KG — ₹1,500</span>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pointer-events-auto">
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f2ede4] text-[#1a1714] px-8 py-4 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-white hover:scale-[1.02] transition-all text-center min-w-[220px]"
              >
                ORDER ON WHATSAPP
              </a>
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:9370943298" 
                  className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-[#f2ede4]/80 hover:text-white transition-colors"
                >
                  9370943298
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        


        {/* Loading Fallback State */}
        {!mounted && (
          <div className="absolute inset-0 bg-[#d6ccbd] z-0 flex items-center justify-center">
            <span className="font-serif tracking-[0.3em] uppercase text-sm text-[#4a433c] animate-pulse">PRANSH</span>
          </div>
        )}

      </div>
    </section>
  );
}
