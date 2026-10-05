'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import PranshHeroScene from '../three/PranshHeroScene';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(0);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Update raw scroll ref for WebGL performance
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
  const smallTextX = useTransform(scrollYProgress, [0, 1], ["0px", prefersReducedMotion ? "0px" : "100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle mouse tracking for typography
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [prefersReducedMotion]);

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
        className="absolute inset-0 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12 z-10 pointer-events-none"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full h-full relative">
          
          {/* Typographic Object */}
          <motion.div 
            animate={{ 
              x: mousePos.x * -12,
              y: mousePos.y * 8
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-[25vh] md:top-[15vh] lg:top-auto lg:bottom-[5vh] left-0 md:left-12 z-20 pointer-events-auto"
          >
            <h1 className="text-[12vw] md:text-[140px] leading-[0.85] font-serif text-[var(--color-charcoal)] mix-blend-difference tracking-tighter drop-shadow-lg">
              <span className="block text-[var(--color-ivory)]">GROWN</span>
              <span className="block text-[6vw] md:text-[80px] italic font-light ml-[10vw] md:ml-[120px] text-[var(--color-champagne)]">WITH</span>
              <span className="block text-[var(--color-ivory)]">PURPOSE.</span>
            </h1>
          </motion.div>

          {/* Editorial Metadata */}
          <motion.div 
            style={{ x: smallTextX }}
            animate={{
              x: mousePos.x * 6,
              y: mousePos.y * -4
            }}
            transition={{ type: "spring", stiffness: 60, damping: 25 }}
            className="absolute bottom-0 right-0 md:right-12 z-30 max-w-[200px] text-right pointer-events-auto"
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
      
      {/* Loading Fallback State */}
      {!mounted && (
        <div className="absolute inset-0 bg-[var(--color-charcoal)] z-0 flex items-center justify-center text-[var(--color-ivory)]">
          <span className="font-serif tracking-[0.3em] uppercase text-sm animate-pulse">PRANSH</span>
        </div>
      )}
    </section>
  );
}
