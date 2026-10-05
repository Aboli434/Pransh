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
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -100]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] md:h-[300vh] w-full bg-[#1c1814]"
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Sky Background Fallback */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#e3c298] via-[#e5cfa3] to-[#8c7454]" />
        
        {/* Real WebGL 3D Layer - Cinematic Rice Field */}
        {mounted && <PranshHeroScene scrollProgress={scrollRef} />}
        
        {/* Readability Overlay */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/60 via-[var(--color-charcoal)]/20 to-transparent z-[5] pointer-events-none mix-blend-multiply" 
        />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent z-[5] pointer-events-none" 
        />
        
        {/* HTML Typographic Layer */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-12 md:pl-24 z-10 pointer-events-none text-[var(--color-ivory)]"
        >
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <div className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-[var(--color-champagne)] drop-shadow-md font-semibold mb-4">
              INDRAYANI RICE
            </div>
            
            <h1 className="text-[12vw] md:text-[80px] lg:text-[100px] leading-[0.9] font-serif tracking-tighter mb-6 drop-shadow-xl text-[var(--color-ivory)]">
              From Our Fields<br/>To Your Table.
            </h1>
            
            <p className="text-base md:text-lg font-sans font-light opacity-100 max-w-md md:max-w-xl leading-relaxed mb-10 drop-shadow-md text-[var(--color-ivory)]/90">
              Indrayani Rice, available in 10 KG and 25 KG packing.
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
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
        >
          <span className="text-[0.6rem] font-sans uppercase tracking-[0.3em] text-[var(--color-ivory)]/80 drop-shadow-md font-semibold">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-12 overflow-hidden flex flex-col items-center">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-[var(--color-champagne)] to-transparent origin-top"
              animate={{ 
                translateY: ['-100%', '100%']
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
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
