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
        
        {/* Very subtle readability gradient (removed heavy overlays) */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-[#3a352f]/40 to-transparent z-[5] pointer-events-none" 
        />
        
        {/* HTML Typographic Layer - Minimal and Elegant */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-16 md:pl-24 z-10 pointer-events-none text-[#3a352f]"
        >
          <div className="max-w-lg md:max-w-xl">
            <div className="text-xs font-sans tracking-[0.3em] uppercase text-[#6b6255] font-semibold mb-6">
              INDRAYANI RICE
            </div>
            
            {/* Elegant, moderately sized typography to leave negative space for the 3D scene */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.0] font-serif tracking-tight mb-8 text-[#2b2723]">
              From Our Fields<br/>To Your Table.
            </h1>
            
            <p className="text-sm md:text-base font-sans font-normal opacity-90 leading-relaxed mb-10 text-[#4a433c]">
              Indrayani Rice<br/>
              10 KG · 25 KG
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto">
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2b2723] text-[#f2ede4] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#4a433c] transition-colors"
              >
                ENQUIRE TO ORDER
              </a>
              <Link 
                href={`/${locale}/journey`}
                className="text-xs font-sans uppercase tracking-[0.2em] text-[#4a433c] border-b border-[#4a433c] pb-1 hover:text-[#2b2723] hover:border-[#2b2723] transition-colors font-semibold"
              >
                EXPLORE THE JOURNEY
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Subtle Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
        >
          <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#4a433c] font-semibold">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-10 overflow-hidden flex flex-col items-center bg-[#d6ccbd]/30">
            <motion.div 
              className="w-full h-full bg-[#4a433c] origin-top"
              animate={{ 
                translateY: ['-100%', '100%']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
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
