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
        
        {/* HTML Typographic Layer - Minimal and Elegant */}
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-16 md:pl-24 z-10 pointer-events-none text-[#f2ede4]"
        >
          <div className="max-w-lg md:max-w-xl">
            <div className="text-xs font-sans tracking-[0.3em] uppercase text-[#f2ede4]/80 font-semibold mb-2">
              PRANSH
            </div>
            <div className="text-sm font-sans tracking-[0.3em] uppercase text-[#f2ede4] font-semibold mb-6 flex flex-col gap-1">
              <span>INDRAYANI RICE</span>
              <span className="text-xs text-[#f2ede4]/80">MAVAL · PAVNANAGAR</span>
            </div>
            
            {/* Elegant, moderately sized typography to leave negative space for the 3D scene */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.0] font-serif tracking-tight mb-8 text-white drop-shadow-lg"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              From the farm<br/>to your table.
            </h1>
            
            <div className="text-sm font-sans uppercase tracking-[0.2em] font-medium text-white mb-8 flex flex-col gap-2">
              <span>10 KG — ₹600</span>
              <span>25 KG — ₹1,500</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto">
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f2ede4] text-[#2b2723] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-white hover:scale-[1.02] transition-all text-center"
              >
                ORDER ON WHATSAPP
              </a>
              <div className="flex flex-col items-start gap-2">
                <a href="tel:9370943298" className="text-xs font-sans uppercase tracking-[0.2em] text-[#f2ede4] border-b border-transparent hover:border-[#f2ede4] transition-colors font-semibold">
                  9370943298
                </a>
                <Link 
                  href="/journey"
                  className="text-xs font-sans uppercase tracking-[0.2em] text-[#f2ede4] border-b border-[#f2ede4]/50 pb-1 hover:text-white hover:border-white transition-colors font-semibold"
                >
                  EXPLORE THE JOURNEY
                </Link>
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
