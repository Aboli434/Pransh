'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { productsData } from '@/data/products';

export default function RiceProduct({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-15%"]);

  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <section id="rice" ref={containerRef} className="w-full bg-[var(--color-ivory)] py-24 md:py-48 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Typographic Split */}
          <motion.div 
            style={{ y: textY }}
            className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 pt-16 lg:pt-0 lg:pr-12"
          >
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.4em] font-medium text-[var(--color-charcoal)]/50 block mb-2">
                The Result
              </span>
              <h2 className="text-6xl md:text-8xl lg:text-[100px] font-serif text-[var(--color-charcoal)] leading-none tracking-tighter">
                Indrayani<span className="text-[var(--color-champagne)]">.</span>
              </h2>
            </div>
            
            <p className="text-xl text-[var(--color-charcoal)]/70 font-light max-w-md mb-12 leading-relaxed">
              Indrayani Rice from Pavnanagar, Maval.
            </p>
            
            <Link 
              href="/our-rice"
              className="group inline-flex items-center gap-6"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-charcoal)] group-hover:text-[var(--color-champagne)] transition-colors font-medium">
                See the Rice
              </span>
              <span className="w-12 h-px bg-[var(--color-charcoal)]/30 group-hover:bg-[var(--color-champagne)] group-hover:w-24 transition-all duration-500 ease-out" />
            </Link>
          </motion.div>

          {/* Macro Image Split */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-[90vh] relative order-1 lg:order-2 overflow-hidden bg-[var(--color-charcoal)]">
            <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <Image 
                src={product.image}
                alt="Indrayani Rice Macro"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-[1.5s]"
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
