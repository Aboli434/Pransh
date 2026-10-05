'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import Journey3DScene from '@/components/three/Journey3DScene';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JourneyPageClient({ dict }: { locale: Locale, dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // We want progress over the entire page height
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, scrollY / maxScroll));
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={containerRef} className="relative w-full bg-transparent">
      
      {/* 3D WebGL Background - Fixed */}
      {mounted && <Journey3DScene scrollRef={scrollRef} />}
      
      {!mounted && (
        <div className="fixed inset-0 bg-[var(--color-charcoal)] z-0 flex items-center justify-center">
          <span className="text-[var(--color-ivory)] font-serif tracking-[0.3em] uppercase animate-pulse">Loading Journey...</span>
        </div>
      )}

      {/* Editorial Header */}
      <div className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative z-10 text-[var(--color-ivory)] pointer-events-none">
        <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl mix-blend-difference">
          FROM SOIL<br />
          <span className="text-[var(--color-champagne)] italic font-light">TO GRAIN.</span>
        </h1>
        <p className="text-lg md:text-xl font-light opacity-80 max-w-xl text-balance mix-blend-difference">
          Scroll to trace the physical journey of PRANSH rice through the seasons.
        </p>
      </div>

      {/* Invisible scroll track for stages */}
      <div className="relative w-full z-10 pointer-events-none">
        {journeyStagesData.map((stage, index) => (
          <JourneyStageText 
            key={stage.id} 
            stage={stage} 
            index={index} 
            dict={dict} 
          />
        ))}
      </div>
      
      {/* Spacer to allow scrolling past the last stage */}
      <div className="h-[50vh]" />
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JourneyStageText({ stage, index, dict }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Entering
  const textYEnter = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const opacityEnter = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  // Leaving
  const textYLeave = useTransform(scrollYProgress, [0.55, 0.7], [0, -100]);
  const opacityLeave = useTransform(scrollYProgress, [0.55, 0.7], [1, 0]);

  const y = useTransform(() => {
    if (prefersReducedMotion) return 0;
    const progress = scrollYProgress.get();
    if (progress < 0.5) return textYEnter.get();
    return textYLeave.get();
  });

  const opacity = useTransform(() => {
    if (prefersReducedMotion) return 1;
    const progress = scrollYProgress.get();
    if (progress < 0.5) return opacityEnter.get();
    return opacityLeave.get();
  });

  return (
    <div ref={sectionRef} className="h-[200vh] relative w-full flex items-center justify-start md:justify-end">
      {/* Floating Typography */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-end p-8 md:p-24 text-[var(--color-ivory)]">
        <motion.div style={{ y, opacity }} className="max-w-2xl text-left md:text-right w-full self-end pointer-events-auto mix-blend-difference">
          <span className="text-xl md:text-3xl font-serif text-[var(--color-champagne)] mb-4 block">
            0{index + 1}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-serif leading-[0.85] tracking-tighter mb-6">
            {dict.journey?.stages?.[stage.id]?.title || stage.id}
          </h2>
          <p className="text-base md:text-lg font-light opacity-90 leading-relaxed md:ml-auto md:w-3/4">
            {dict.journey?.stages?.[stage.id]?.desc || "[Description pending]"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
