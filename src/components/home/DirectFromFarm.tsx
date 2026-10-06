'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function DirectFromFarm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", prefersReducedMotion ? "0%" : "-10%"]);

  return (
    <section id="direct" ref={containerRef} className="py-32 lg:py-48 bg-[var(--color-terracotta)] relative overflow-hidden text-[var(--color-ivory)]">
      
      {/* Decorative vertical timeline line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-champagne)]/40 to-transparent z-0" />

      <Container className="relative z-10">
        
        {/* Magazine Spread Layout */}
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
          
          {/* Background Image Layer */}
          <motion.div 
            style={{ y: imgY, rotateZ: prefersReducedMotion ? 0 : -2 }}
            className="absolute right-[5%] md:right-[20%] top-[10%] md:top-[15%] w-[80%] md:w-[45%] aspect-[4/3] z-0 shadow-2xl opacity-70 mix-blend-overlay"
          >
            <Image
              src="/images/farmer/farmer-field.jpg"
              alt="Farm field"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          
          {/* Foreground Typography Layer */}
          <motion.div 
            style={{ y: textY }}
            className="z-20 text-center w-full max-w-4xl px-4"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[120px] font-serif leading-[0.85] tracking-tight mb-12 drop-shadow-lg text-[var(--color-ivory)] mix-blend-difference">
              CLOSER<br />
              <span className="text-[var(--color-champagne)] italic font-light ml-12 md:ml-24">TO THE</span><br />
              SOURCE.
            </h2>
            
            <div className="max-w-md mx-auto bg-[var(--color-earth-brown)]/40 backdrop-blur-md p-8 border border-[var(--color-ivory)]/10 shadow-2xl text-left">
              <p className="text-lg text-[var(--color-ivory)]/90 font-light mb-8 leading-relaxed">
                {dict.directFromFarm.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent border-[var(--color-ivory)] text-[var(--color-ivory)] hover:bg-[var(--color-ivory)] hover:text-[var(--color-terracotta)]">
                    {dict.directFromFarm.primaryCta}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
