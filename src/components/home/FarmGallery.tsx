'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { galleryData } from '@/data/gallery';

export default function FarmGallery({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "20%"]);

  return (
    <section id="gallery" ref={containerRef} className="w-full bg-[var(--color-ivory)] py-24 md:py-48 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
        
        {/* Editorial Heading */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--color-charcoal)] tracking-tight mb-8">
            Visual Proof.
          </h2>
          <Link 
            href={`/${locale}/gallery`}
            className="group inline-flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)]/60 group-hover:text-[var(--color-charcoal)] transition-colors">
              View the Story
            </span>
            <span className="w-px h-12 bg-[var(--color-charcoal)]/30 group-hover:bg-[var(--color-charcoal)] group-hover:h-16 transition-all duration-500 ease-out" />
          </Link>
        </div>

        {/* Photo Essay Composition */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 lg:gap-24">
          
          <motion.div 
            style={{ y: y1 }}
            className="w-full md:w-[40%] aspect-[3/4] relative group overflow-hidden"
          >
            <Image
              src={galleryData[0].src}
              alt="Farm Landscape"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="w-full md:w-[45%] aspect-square relative group overflow-hidden md:mt-32"
          >
            <Image
              src={galleryData[3].src}
              alt="Harvest Detail"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
