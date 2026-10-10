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
        
        {/* Top Sky Gradient for Navbar contrast & Bottom gradient for typography */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-[5] pointer-events-none" 
        >
          {/* Top sky/dark gradient for Navbar */}
          <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#87A29E]/80 via-[#87A29E]/30 to-transparent" />
          
          {/* Bottom/Left gradient for main text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/90 via-[#1a1714]/40 to-transparent" />
        </motion.div>
        
        {/* HTML Typographic Layer - Premium Editorial */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-16 md:pl-24 z-10 pointer-events-none text-[#f2ede4]"
        >
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
              <span>10 KG — ₹700</span>
              <span className="opacity-50">·</span>
              <span>25 KG — ₹1,750</span>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto">
              <motion.div
                className="rounded-[6px] overflow-hidden"
                whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a 
                  href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center font-sans uppercase text-[11px] tracking-[0.18em] font-semibold text-[#1B2B1F] bg-[#F5F3EB] hover:bg-[#EAE5D9] transition-colors duration-300 px-8 py-[12px] min-w-[220px] focus:outline-none"
                >
                  <span className="relative z-10">ORDER ON WHATSAPP</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12"
                    initial={{ x: "-150%" }}
                    whileHover={{ x: "150%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </a>
              </motion.div>
              
              <motion.div
                className="rounded-[6px] overflow-hidden"
                whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a 
                  href="tel:9370943298" 
                  className="relative flex items-center justify-center font-sans uppercase text-[11px] tracking-[0.18em] font-semibold text-[#1B2B1F] bg-[#F5F3EB] hover:bg-[#EAE5D9] transition-colors duration-300 px-8 py-[12px] min-w-[220px] focus:outline-none"
                >
                  <span className="relative z-10">CALL NOW</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12"
                    initial={{ x: "-150%" }}
                    whileHover={{ x: "150%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </a>
              </motion.div>
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
