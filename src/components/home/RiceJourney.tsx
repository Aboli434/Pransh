'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import TextReveal from '../motion/TextReveal';

export default function RiceJourney({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yMove = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "25%"]);

  return (
    <section id="journey" ref={containerRef} className="w-full bg-[var(--color-charcoal)] py-32 md:py-48 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Typographic Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-12">
              <span className="h-px w-24 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--color-champagne)]">
                The Process
              </span>
            </div>
            
            <div className="text-5xl md:text-7xl lg:text-[90px] leading-[1.05] font-serif text-[var(--color-ivory)] mb-12 flex flex-col gap-2">
              <TextReveal delay={0.2} staggerDelay={0.08}>From</TextReveal>
              <TextReveal delay={0.4} staggerDelay={0.08}>Seed To</TextReveal>
              <TextReveal delay={0.6} staggerDelay={0.08}>Grain.</TextReveal>
            </div>
            
            <p className="text-xl md:text-2xl text-[var(--color-ivory)]/60 font-light max-w-md mb-16 leading-relaxed">
              Every harvest is a dialogue between the soil, the seasons, and the hands that guide them.
            </p>
            
            <Link 
              href={`/${locale}/journey`}
              className="group inline-flex items-center gap-6"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                Enter the Journey
              </span>
              <span className="w-12 h-px bg-[var(--color-ivory)]/40 group-hover:bg-[var(--color-champagne)] group-hover:w-24 transition-all duration-500 ease-out" />
            </Link>
          </div>

          {/* Cinematic Image Right Side */}
          <div className="w-full lg:w-1/2 relative h-[60vh] lg:h-[85vh] overflow-hidden group">
            <motion.div 
              style={{ y: yMove }}
              className="absolute inset-[-15%] w-[130%] h-[130%]"
            >
              <Image 
                src={journeyStagesData[3].image} // Harvest image
                alt="Harvest"
                fill
                className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
