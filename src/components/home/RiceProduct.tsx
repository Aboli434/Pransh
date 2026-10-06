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
            className="w-full lg:w-[40%] flex flex-col justify-center order-2 lg:order-1 pt-16 lg:pt-0 lg:pr-16"
          >
            <div className="mb-12">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-charcoal)]/50 block mb-6">
                THE GRAIN
              </span>
              <h2 className="text-6xl md:text-8xl lg:text-[110px] font-serif text-[var(--color-charcoal)] leading-[0.9] tracking-tighter">
                INDRAYANI<br/>RICE
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 text-sm md:text-base font-sans uppercase tracking-[0.2em] text-[var(--color-charcoal)]/90 mb-16 font-medium">
              <div className="flex justify-between items-center max-w-[200px] border-b border-[var(--color-charcoal)]/10 pb-4">
                <span>10 KG</span>
                <span>₹600</span>
              </div>
              <div className="flex justify-between items-center max-w-[200px] border-b border-[var(--color-charcoal)]/10 pb-4">
                <span>25 KG</span>
                <span>₹1,500</span>
              </div>
            </div>
            
            <a 
              href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-8 py-4 text-[10px] font-sans uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-colors text-center self-start"
            >
              ORDER TO ENQUIRE
            </a>
          </motion.div>

          {/* Macro Image Split */}
          <div className="w-full lg:w-[60%] h-[60vh] lg:h-[90vh] relative order-1 lg:order-2 overflow-hidden bg-[var(--color-charcoal)]">
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
