'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { journeyStagesData, RiceJourneyStage } from '@/data/journey';


// The timeline component that draws down as you scroll
function JourneyTimeline({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Smooth the scroll progress so the line feels organic
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Background track (muted) */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-gold)]/20 -translate-x-1/2 z-0" />
      {/* Active track (drawn by scroll) */}
      <motion.div 
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-gold)] -translate-x-1/2 z-10 origin-top"
        style={{ scaleY }}
      />
    </>
  );
}

function StageBlock({ 
  stage, 
  index, 
  isLast 
}: { 
  stage: RiceJourneyStage, 
  index: number,
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"]
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["center center", "end 20%"]
  });

  // Animations
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(20% 0 0 0)', 'inset(0% 0 0 0)']);
  
  // Marker animation (active when in center of screen)
  const markerScale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1.2]);
  const markerOpacity = useTransform(exitProgress, [0, 1], [1, 0.4]);

  const isEven = index % 2 === 0;

  if (isLast) {
    return (
      <div ref={ref} className="relative w-full py-32 md:py-48 flex flex-col items-center justify-center">
        {/* Final Stage Marker */}
        <div className="absolute left-6 md:left-1/2 top-32 w-3 h-3 rounded-full bg-[var(--color-gold)] -translate-x-1/2 z-20" />
        
        <motion.div style={{ opacity, y }} className="w-full max-w-6xl mx-auto px-4 md:px-12 relative z-10">
          <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden mb-12">
            <motion.div style={{ scale }} className="w-full h-full">
              <Image 
                src={stage.image} 
                alt="Final Indrayani Rice" 
                fill 
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </div>
          
          <div className="text-center md:text-left md:absolute md:bottom-0 md:left-24 bg-[var(--color-parchment)] md:p-12 z-20">
            <div className="text-sm font-sans uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4 font-semibold">
              10
            </div>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-4 text-[var(--color-charcoal)]">
              FINAL RICE
            </h2>
            <div className="text-xl md:text-3xl font-serif tracking-tight mb-8 text-[var(--color-charcoal)]/80">
              INDRAYANI RICE
            </div>
            <p className="text-sm font-sans uppercase tracking-[0.2em] mb-12 text-[var(--color-charcoal)]/60">
              10 KG · 25 KG
            </p>
            <motion.div className="rounded-[6px] overflow-hidden inline-block" whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3, ease: "easeOut" }}>
<a 
              href="https://wa.me/919370943298"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center rounded-[6px] transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold   "
            >
<span className="relative z-10">ENQUIRE TO ORDER</span>
<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12" initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.7, ease: "easeInOut" }} />

</a>
</motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Desktop widths: image takes 55-65%, text takes 35-45%
  // To make it organic, we vary the image aspect ratios and widths slightly based on index
  const imageAspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]", "aspect-video", "aspect-[3/4]"];
  const imageAspect = imageAspects[index % imageAspects.length];

  return (
    <div ref={ref} className="relative w-full py-20 md:py-32 flex flex-col md:flex-row items-center max-w-[1600px] mx-auto px-6 md:px-12">
      
      {/* Timeline Marker */}
      <motion.div 
        style={{ scale: markerScale, opacity: markerOpacity }}
        className="absolute left-6 md:left-1/2 top-1/2 w-3 h-3 rounded-full bg-[var(--color-gold)] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
      />
      <motion.div 
        style={{ scale: markerScale, opacity: markerOpacity }}
        className="absolute left-6 top-24 w-3 h-3 rounded-full bg-[var(--color-gold)] -translate-x-1/2 z-20 md:hidden"
      />

      {/* Mobile Layout (Always Text then Image) */}
      <div className="w-full md:hidden flex flex-col pl-8">
        <motion.div style={{ opacity, y }} className="mb-8">
          <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4 font-semibold">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
          <h2 className="text-4xl font-serif tracking-tighter mb-4 text-[var(--color-charcoal)]">
            {stage.title}
          </h2>
          <p className="text-base font-sans font-light text-[var(--color-charcoal)]/80 leading-relaxed">
            {stage.desc}
          </p>
        </motion.div>
        <motion.div style={{ opacity, clipPath }} className={`relative w-full ${imageAspect} overflow-hidden`}>
          <motion.div style={{ scale }} className="relative w-full h-full">
            <Image src={stage.image} alt={stage.title} fill className="object-cover" sizes="100vw" />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout (Alternating) */}
      <div className="hidden md:flex w-full items-center">
        {isEven ? (
          <>
            <div className="w-[55%] pr-16 lg:pr-24 flex justify-end">
              <motion.div style={{ opacity, clipPath }} className={`relative w-full max-w-2xl ${imageAspect} overflow-hidden`}>
                <motion.div style={{ scale }} className="relative w-full h-full">
                  <Image src={stage.image} alt={stage.title} fill className="object-cover" sizes="50vw" />
                </motion.div>
              </motion.div>
            </div>
            <div className="w-[45%] pl-16 lg:pl-24">
              <motion.div style={{ opacity, y }} className="max-w-md">
                <div className="text-sm font-sans uppercase tracking-[0.4em] text-[var(--color-gold)] mb-6 font-semibold">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
                <h2 className="text-5xl lg:text-6xl font-serif tracking-tighter mb-6 text-[var(--color-charcoal)]">
                  {stage.title}
                </h2>
                <p className="text-lg font-sans font-light text-[var(--color-charcoal)]/80 leading-relaxed">
                  {stage.desc}
                </p>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[45%] pr-16 lg:pr-24 flex justify-end">
              <motion.div style={{ opacity, y }} className="max-w-md">
                <div className="text-sm font-sans uppercase tracking-[0.4em] text-[var(--color-gold)] mb-6 font-semibold">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
                <h2 className="text-5xl lg:text-6xl font-serif tracking-tighter mb-6 text-[var(--color-charcoal)]">
                  {stage.title}
                </h2>
                <p className="text-lg font-sans font-light text-[var(--color-charcoal)]/80 leading-relaxed">
                  {stage.desc}
                </p>
              </motion.div>
            </div>
            <div className="w-[55%] pl-16 lg:pl-24">
              <motion.div style={{ opacity, clipPath }} className={`relative w-full max-w-2xl ${imageAspect} overflow-hidden`}>
                <motion.div style={{ scale }} className="relative w-full h-full">
                  <Image src={stage.image} alt={stage.title} fill className="object-cover" sizes="50vw" />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default function JourneyPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="relative w-full min-h-screen text-[var(--color-charcoal)] bg-[var(--color-sand)]">
      
      {/* Intro Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <div className="text-xs font-sans uppercase tracking-[0.4em] text-[var(--color-gold)] mb-6 font-semibold">
          THE RICE JOURNEY
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9] tracking-tighter mb-10 text-[var(--color-charcoal)]">
          FROM FIELD<br/>TO GRAIN
        </h1>
        <p className="text-base md:text-xl font-serif italic text-[var(--color-charcoal)]/60 max-w-2xl mx-auto leading-relaxed">
          &quot;Every grain passes through a journey of growth, harvest and preparation before it reaches the table.&quot;
        </p>
      </section>

      {/* The Journey Timeline Container */}
      <div className="relative w-full pb-32">
        <JourneyTimeline scrollYProgress={scrollYProgress} />
        
        {/* Stages */}
        {journeyStagesData.map((stage, index) => (
          <StageBlock 
            key={stage.id} 
            stage={stage} 
            index={index} 
            isLast={index === journeyStagesData.length - 1}
          />
        ))}
      </div>

    </main>
  );
}
