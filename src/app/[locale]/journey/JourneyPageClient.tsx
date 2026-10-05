'use client';
import { useRef, useEffect, useState } from 'react';
import { journeyStagesData, RiceJourneyStage } from '@/data/journey';
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
    <main ref={containerRef} className="relative w-full bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      
      {/* Header */}
      <div className="pt-32 pb-12 px-4 md:px-12 max-w-[1600px] mx-auto text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-serif leading-[1] tracking-tighter mb-4 text-[var(--color-charcoal)]">
          THE JOURNEY<br />
          <span className="text-[var(--color-champagne)] italic font-light">FROM SEED TO GRAIN</span>
        </h1>
        <p className="text-sm font-sans uppercase tracking-[0.3em] opacity-60">
          8 Stages
        </p>
      </div>

      <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto px-4 md:px-12 relative pb-32">
        
        {/* LEFT / TOP: Sticky 3D Image Viewer */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] sticky top-24 md:top-32 z-10 bg-[var(--color-charcoal)] overflow-hidden">
          {mounted && <Journey3DScene scrollRef={scrollRef} />}
        </div>

        {/* RIGHT / BOTTOM: Scrollable Text Stages */}
        <div className="w-full md:w-1/2 flex flex-col md:pl-12 lg:pl-24 relative z-20 mt-12 md:mt-0">
          {journeyStagesData.map((stage, index) => (
            <JourneyStageText 
              key={stage.id} 
              stage={stage} 
              index={index} 
              isActive={activeStage === index}
            />
          ))}
        </div>
        
      </div>
      
    </main>
  );
}

function JourneyStageText({ stage, index, isActive }: { stage: RiceJourneyStage, index: number, isActive: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={sectionRef} className="h-[80vh] md:h-[100vh] relative w-full flex items-center">
      <motion.div 
        style={{ opacity }} 
        className="w-full pointer-events-auto"
      >
        <div className="text-xs font-sans uppercase tracking-[0.4em] text-[var(--color-champagne)] mb-4 font-semibold">
          0{index + 1} / 08
        </div>
        <h2 className="text-4xl md:text-5xl font-serif leading-[1] tracking-tighter mb-6 text-[var(--color-charcoal)]">
          {stage.title}
        </h2>
        <p className="text-base md:text-lg font-light text-[var(--color-charcoal)]/80 leading-relaxed max-w-sm mb-12">
          {stage.desc}
        </p>

        {/* Mobile Next Stage Hint (visible mainly on mobile to guide scrolling) */}
        {index < 7 && (
          <div className="md:hidden flex items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-[var(--color-charcoal)]/50 mt-12">
            <span className="w-8 h-px bg-current"></span>
            Scroll to Next Stage
          </div>
        )}
      </motion.div>
    </div>
  );
}
