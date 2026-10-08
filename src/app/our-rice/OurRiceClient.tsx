'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { images } from '@/data/images';

export default function OurRiceClient({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <main ref={containerRef} className="bg-[var(--color-parchment)] min-h-screen text-[var(--color-charcoal)]">
      
      {/* 01 HERO INTRO */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-12 max-w-[1400px] mx-auto text-center flex flex-col items-center">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold opacity-60 mb-8 block">
          OUR RICE
        </span>
        <h1 className="text-6xl md:text-[6rem] lg:text-[8rem] font-serif leading-[0.85] tracking-tighter mb-4">
          INDRAYANI<br/>RICE
        </h1>
        <h2 className="text-3xl md:text-5xl font-serif italic text-[var(--color-gold)] mb-16">
          इंद्रायणी तांदूळ
        </h2>
      </section>

      {/* 02 LARGE MACRO PHOTOGRAPHY */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-[var(--color-earth)]">
        <motion.div style={{ y: heroY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
          <Image 
            src={images.rice.v01_macro} 
            alt="Indrayani Rice Macro"
            fill
            priority
            className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none" />
      </section>

      {/* 03 THE GRAIN & PRICING */}
      <section className="py-24 md:py-48 px-4 md:px-12 bg-[var(--color-charcoal)] text-[var(--color-parchment)]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
          
          <div className="w-full md:w-1/2 flex flex-col items-start pt-12">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-8 text-[var(--color-gold)]">
              THE GRAIN
            </h2>
            <p className="text-sm md:text-base font-sans uppercase tracking-[0.1em] leading-relaxed max-w-md opacity-80 mb-12">
              Indrayani rice is renowned for its medium-short, thick grain that develops a unique stickiness and rich aroma when cooked. Grown in the specific micro-climate of Maval, it represents the authentic taste of Western Maharashtra.
            </p>
            
            <div className="w-full h-px bg-[var(--color-parchment)]/20 mb-12"></div>
            
            <div className="flex flex-col gap-8 w-full max-w-sm mb-16">
              <div className="flex justify-between items-end border-b border-[var(--color-parchment)]/20 pb-4">
                <span className="opacity-80 text-xs font-sans uppercase tracking-[0.2em]">10 KG PACKING</span>
                <span className="text-4xl font-serif text-[var(--color-gold)]">₹600</span>
              </div>
              <div className="flex justify-between items-end border-b border-[var(--color-parchment)]/20 pb-4">
                <span className="opacity-80 text-xs font-sans uppercase tracking-[0.2em]">25 KG PACKING</span>
                <span className="text-4xl font-serif text-[var(--color-gold)]">₹1,500</span>
              </div>
            </div>

            <a 
              href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[var(--color-gold)] text-[var(--color-gold)] px-12 py-5 text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors text-center mb-12"
            >
              ORDER ON WHATSAPP
            </a>

            <div className="flex flex-col gap-4 text-xs font-sans tracking-[0.3em] uppercase opacity-80">
              <a href="tel:9370943298" className="hover:text-[var(--color-gold)] transition-colors">9370943298</a>
              <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-gold)] transition-colors lowercase">unmeshrisbud345@gmail.com</a>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden bg-[var(--color-earth)]">
            <Image 
              src={images.gallery[2]} 
              alt="Cooked Rice Context"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
