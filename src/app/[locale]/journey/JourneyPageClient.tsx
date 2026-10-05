'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';

const bgColors = [
  "var(--color-warm-beige)",
  "var(--color-earth-brown)",
  "var(--color-sage)",
  "var(--color-golden-wheat)",
  "var(--color-warm-sand)",
  "var(--color-charcoal)",
  "var(--color-ivory)",
  "var(--color-champagne)",
];

const textColors = [
  "var(--color-charcoal)",
  "var(--color-ivory)",
  "var(--color-ivory)",
  "var(--color-charcoal)",
  "var(--color-charcoal)",
  "var(--color-ivory)",
  "var(--color-charcoal)",
  "var(--color-charcoal)",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JourneyPageClient({ dict }: { locale: Locale, dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <main ref={containerRef} className="relative w-full bg-[var(--color-charcoal)]">
      {/* Editorial Header */}
      <div className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative z-10 text-[var(--color-ivory)]">
        <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif leading-[0.85] tracking-tighter mb-8">
          FROM SOIL<br />
          <span className="text-[var(--color-champagne)] italic font-light">TO GRAIN.</span>
        </h1>
        <p className="text-lg md:text-xl font-light opacity-60 max-w-xl text-balance">
          Scroll to trace the physical journey of PRANSH rice through the seasons, hands, and harvest.
        </p>
      </div>

      {/* Cinematic Horizontal Page Turning Scroll */}
      <div className="relative w-full">
        {journeyStagesData.map((stage, index) => {
          return (
            <JourneyStage 
              key={stage.id} 
              stage={stage} 
              index={index} 
              dict={dict} 
              bgColor={bgColors[index % bgColors.length]}
              textColor={textColors[index % textColors.length]}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JourneyStage({ stage, index, dict, bgColor, prefersReducedMotion }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Entering (0.2 to 0.4)
  const xEnter = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);
  const scaleEnter = useTransform(scrollYProgress, [0.2, 0.4], [0.85, 1]);
  const textYEnter = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const opacityEnter = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  // Leaving (0.6 to 0.8)
  const xLeave = useTransform(scrollYProgress, [0.6, 0.8], ["0%", "-50%"]);
  const scaleLeave = useTransform(scrollYProgress, [0.6, 0.8], [1, 1.15]);
  const opacityLeave = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  const x = useTransform(() => {
    if (prefersReducedMotion) return "0%";
    const progress = scrollYProgress.get();
    if (progress < 0.4) return xEnter.get();
    return xLeave.get();
  });

  const scale = useTransform(() => {
    if (prefersReducedMotion) return 1;
    const progress = scrollYProgress.get();
    if (progress < 0.4) return scaleEnter.get();
    return scaleLeave.get();
  });

  const textY = useTransform(() => {
    if (prefersReducedMotion) return 0;
    const progress = scrollYProgress.get();
    if (progress < 0.4) return textYEnter.get();
    return 0; // Stays fixed while leaving
  });

  const textOpacity = useTransform(() => {
    if (prefersReducedMotion) return 1;
    const progress = scrollYProgress.get();
    if (progress < 0.4) return opacityEnter.get();
    return opacityLeave.get();
  });

  return (
    <div ref={sectionRef} className="h-[250vh] relative w-full">
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <motion.div 
          style={{ x, scale }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <div className="absolute inset-0 w-full h-full p-4 md:p-12 pb-32 md:pb-12">
            <div className="relative w-full h-full">
              <Image 
                src={stage.image}
                alt={dict.journey?.stages?.[stage.id]?.title || stage.id}
                fill
                priority={index < 2}
                className="object-cover object-[center_60%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Floating Typography */}
        <div className="absolute inset-0 pointer-events-none p-8 md:p-24 flex flex-col justify-end text-[var(--color-ivory)] z-10">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-4xl">
            <span className="text-xl md:text-3xl font-serif text-[var(--color-champagne)] mb-4 block">
              0{index + 1}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-[130px] font-serif leading-[0.85] tracking-tighter mb-6 mix-blend-overlay">
              {dict.journey?.stages?.[stage.id]?.title || stage.id}
            </h2>
            <p className="text-lg md:text-xl font-light opacity-90 max-w-lg leading-relaxed mix-blend-normal">
              {dict.journey?.stages?.[stage.id]?.desc || "[Description pending]"}
            </p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
