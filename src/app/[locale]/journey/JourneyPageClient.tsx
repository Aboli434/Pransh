'use client';
import { useRef, useEffect, useState } from 'react';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import Journey3DScene from '@/components/three/Journey3DScene';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function JourneyPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      scrollRef.current = progress;
      
      const currentStage = Math.min(
        journeyStagesData.length - 1, 
        Math.floor(progress * journeyStagesData.length)
      );
      setActiveStage(currentStage);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={containerRef} className="relative w-full bg-transparent">
      
      {/* 3D WebGL Background - Fixed */}
      {mounted && <Journey3DScene scrollRef={scrollRef} />}

      {/* Progress System - Fixed Left */}
      <div className="fixed left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 hidden md:flex mix-blend-difference text-[var(--color-ivory)]">
        {journeyStagesData.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className={`text-[10px] font-sans transition-opacity duration-300 ${activeStage === i ? 'opacity-100' : 'opacity-30'}`}>
              0{i + 1}
            </span>
            <div className={`w-px transition-all duration-300 ${activeStage === i ? 'h-8 bg-[var(--color-champagne)]' : 'h-4 bg-[var(--color-ivory)]/30'}`} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="h-[50vh] w-full flex flex-col justify-center px-4 md:px-24 relative z-10 text-[var(--color-ivory)] pointer-events-none mix-blend-difference mt-24">
        <h1 className="text-4xl md:text-6xl font-serif leading-[1] tracking-tighter">
          THE JOURNEY<br />
          <span className="text-[var(--color-champagne)] italic font-light">FROM SEED TO GRAIN</span>
        </h1>
      </div>

      {/* Scrollable Text Track */}
      <div className="relative w-full z-10 pointer-events-none">
        {journeyStagesData.map((stage, index) => (
          <JourneyStageText 
            key={stage.id} 
            stage={stage} 
            index={index} 
          />
        ))}
      </div>
      
    </main>
  );
}

import { RiceJourneyStage } from '@/data/journey';

function JourneyStageText({ stage, index }: { stage: RiceJourneyStage, index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <div ref={sectionRef} className="h-[120vh] relative w-full flex items-center">
      <motion.div 
        style={{ opacity }} 
        className="w-full px-4 md:px-24 lg:w-1/3 mix-blend-difference text-[var(--color-ivory)] pointer-events-auto"
      >
        <span className="text-lg md:text-2xl font-serif text-[var(--color-champagne)] mb-2 block">
          0{index + 1} / 08
        </span>
        <h2 className="text-4xl md:text-5xl font-serif leading-[1] tracking-tighter mb-4">
          {stage.title}
        </h2>
        <p className="text-base md:text-lg font-light opacity-90 leading-relaxed max-w-sm">
          {stage.desc}
        </p>
      </motion.div>
    </div>
  );
}
