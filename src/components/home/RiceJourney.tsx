'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import Container from '../ui/Container';
import Button from '../ui/Button';
import TiltCard from '../motion/TiltCard';

export default function RiceJourney({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-20%"]);

  // We only show a few stages as a teaser
  const teaserStages = journeyStagesData.slice(0, 4);

  return (
    <section id="journey" ref={containerRef} className="py-24 md:py-32 bg-[var(--color-charcoal)] overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
                {dict.journey.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-ivory)] leading-tight">
              {dict.journey.heading}
            </h2>
          </div>
          
          <Link href={`/${locale}/journey`} className="hidden md:block">
            <Button variant="primary">Explore the Journey</Button>
          </Link>
        </div>

        {/* Horizontal Scroll Teaser */}
        <div className="relative mt-12 w-full">
          <motion.div 
            style={{ x: xMove }}
            className="flex gap-6 md:gap-8 min-w-max pr-[20vw]"
          >
            {teaserStages.map((stage, i) => (
              <TiltCard key={stage.id} maxTilt={10} className="w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] shrink-0">
                <div className="relative aspect-[3/4] bg-[var(--color-ivory)]/5 border border-[var(--color-ivory)]/10 overflow-hidden group">
                  <Image 
                    src={stage.image}
                    alt={`Stage ${i + 1}`}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 75vw, (max-width: 1024px) 35vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <span className="text-[var(--color-champagne)] text-sm font-semibold tracking-widest uppercase mb-2 block">
                      0{i + 1}
                    </span>
                    <h3 className="text-[var(--color-ivory)] font-serif text-2xl md:text-3xl mb-2">
                      {/* Using English fallback here for simplicity, in a real scenario we'd extract from dict.journey.stages */}
                      {stage.id.charAt(0).toUpperCase() + stage.id.slice(1)}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 md:hidden">
          <Link href={`/${locale}/journey`}>
            <Button variant="primary" className="w-full justify-center">Explore the Journey</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
