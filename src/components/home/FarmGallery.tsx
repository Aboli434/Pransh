'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { images } from '@/data/images';

export default function FarmGallery({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "10%"]);

  return (
    <section id="gallery" ref={containerRef} className="w-full bg-[var(--color-charcoal)] text-[var(--color-parchment)] relative">
      
      {/* SECTION 04 - FROM PAVNANAGAR (Full Bleed Cinematic Landscape) */}
      <div className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-[-20%] w-[140%] h-[140%]">
          <Image 
            src={images.gallery[0]} 
            alt="Pavnanagar Landscape" 
            fill 
            sizes="100vw"
            className="object-cover opacity-80" 
          />
        </motion.div>
        
        {/* Gradient overlays to blend into the charcoal background below */}
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-[var(--color-charcoal)]/30 pointer-events-none" />

        <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center p-4">
          <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-parchment)]/70 mb-8 block">
            FROM PAVNANAGAR
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-[90px] font-serif leading-[1.1] tracking-tighter text-[var(--color-parchment)] mb-8">
            Where the grain<br/>begins.
          </h2>
          <span className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] opacity-80 text-[var(--color-gold)]">
            MAVAL · MAHARASHTRA
          </span>
        </div>
      </div>

      {/* SECTION 05 - VISUAL ARCHIVE TEASER (Asymmetric Composition) */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 py-24 md:py-48">
        
        <div className="mb-24 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">
            A VISUAL ARCHIVE
          </h2>
          <Link 
            href="/gallery"
            className="hidden md:inline-block border border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors"
          >
            EXPLORE THE FULL ARCHIVE
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Enormous Image */}
          <div className="w-full lg:w-[60%] flex flex-col group">
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden mb-6 bg-[var(--color-earth)]">
              <Image 
                src={images.gallery[1]} 
                alt="The Land" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <span className="text-2xl md:text-3xl font-serif text-[var(--color-gold)]">THE LAND</span>
          </div>

          {/* Two smaller images */}
          <div className="w-full lg:w-[40%] flex flex-col gap-12 lg:gap-24 pt-12 lg:pt-32">
            <div className="flex flex-col group lg:ml-12">
              <div className="relative w-full aspect-square overflow-hidden mb-6 bg-[var(--color-earth)]">
                <Image 
                  src={images.gallery[3]} 
                  alt="The Hands" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <span className="text-xl md:text-2xl font-serif text-[var(--color-gold)]">THE HANDS</span>
            </div>

            <div className="flex flex-col group lg:mr-12">
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 bg-[var(--color-earth)]">
                <Image 
                  src={images.gallery[5]} 
                  alt="The Grain" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <span className="text-xl md:text-2xl font-serif text-[var(--color-gold)]">THE GRAIN</span>
            </div>
          </div>
        </div>

        <div className="mt-16 md:hidden w-full flex justify-center">
          <Link 
            href="/gallery"
            className="w-full text-center border border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors"
          >
            EXPLORE THE FULL ARCHIVE
          </Link>
        </div>

      </div>
    </section>
  );
}
