'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { galleryData } from '@/data/gallery';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryClient({ dict }: { locale: Locale, dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <main className="pt-32 pb-32 bg-[var(--color-ivory)] min-h-screen relative overflow-hidden" ref={containerRef}>
      
      <div className="mb-24 text-center max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)] mb-8 tracking-tighter">
          Visual Proof.
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-charcoal)]/60 font-light text-balance leading-relaxed">
          The land, the seasons, the work, and the moments behind PRANSH.
        </p>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Custom Irregular Grid Composition */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-8 auto-rows-[150px] md:auto-rows-[250px]">
          
          {galleryData.map((item, index) => {
            // Irregular layout mapping based on index
            let gridClass = "col-span-2 row-span-1";
            let speed = 0;
            
            if (index === 0) { gridClass = "col-span-2 md:col-span-4 lg:col-span-7 row-span-2 md:row-span-3 lg:row-span-4"; speed = -0.05; }
            else if (index === 1) { gridClass = "col-span-1 md:col-span-2 lg:col-span-4 lg:col-start-9 row-span-1 md:row-span-2 lg:row-span-2"; speed = 0.08; }
            else if (index === 2) { gridClass = "col-span-1 md:col-span-2 lg:col-span-3 lg:col-start-9 row-span-1 md:row-span-2 lg:row-span-3"; speed = -0.02; }
            else if (index === 3) { gridClass = "col-span-2 md:col-span-2 lg:col-span-4 lg:col-start-1 row-span-1 md:row-span-1 lg:row-span-2"; speed = 0.05; }
            else if (index === 4) { gridClass = "col-span-2 md:col-span-4 lg:col-span-8 lg:col-start-5 row-span-1 md:row-span-2 lg:row-span-3"; speed = -0.03; }
            
            return (
              <GalleryItem 
                key={item.id}
                item={item}
                dict={dict}
                gridClass={gridClass}
                speed={speed}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GalleryItem({ item, dict, gridClass, speed }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : `${speed * 100}%`]);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={`relative group overflow-hidden bg-[var(--color-warm-beige)] ${gridClass}`}
    >
      <motion.div 
        className="w-full h-full relative"
        whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image 
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      
      {/* Editorial Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/80 via-[var(--color-charcoal)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <span className="text-xs uppercase tracking-widest text-[var(--color-champagne)] font-bold block mb-2">
          {item.captionKey ? (dict.farmGallery?.captions as Record<string, string>)?.[item.captionKey] : ''}
        </span>
        <span className="text-white font-serif text-xl tracking-wide">{item.alt}</span>
      </div>
    </motion.div>
  );
}
