'use client';
import { useRef } from 'react';
import Image from 'next/image';
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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "15%"]);
  
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <section id="rice" ref={containerRef} className="w-full bg-[var(--color-charcoal)] text-[var(--color-parchment)] py-24 md:py-48 overflow-hidden relative">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Top Layout */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16 md:mb-24">
          
          <div className="flex-1">
            <span className="text-xs font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-gold)] mb-8 block">
              01 / THE GRAIN
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-serif leading-[0.85] tracking-tighter text-[var(--color-parchment)]">
              INDRAYANI<br/>RICE
            </h2>
          </div>

          <div className="flex-1 lg:max-w-md pb-4">
            <p className="text-sm md:text-base font-sans leading-relaxed text-[var(--color-parchment)]/70 mb-12">
              Cultivated in the fertile valleys of Maval, our Indrayani rice offers a signature stickiness and profound aroma. A true staple of Western Maharashtra.
            </p>
            
            <div className="flex items-center gap-8 md:gap-16 mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-2">10 KG</span>
                <span className="text-4xl md:text-5xl font-serif text-[var(--color-gold)]">₹700</span>
              </div>
              <div className="w-px h-16 bg-[var(--color-parchment)]/20"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-2">25 KG</span>
                <span className="text-4xl md:text-5xl font-serif text-[var(--color-gold)]">₹1,750</span>
              </div>
            </div>

            <motion.div className="rounded-[6px] overflow-hidden inline-block" whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3, ease: "easeOut" }}>
<a 
              href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center rounded-[6px] transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] inline-block border border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-bold   "
            >
<span className="relative z-10">ORDER ON WHATSAPP</span>
<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12" initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.7, ease: "easeInOut" }} />

</a>
</motion.div>
          </div>

        </div>

        {/* Large Macro Image - 65% height or vast expanse */}
        <div className="w-full h-[50vh] md:h-[75vh] relative overflow-hidden bg-[var(--color-earth)]">
          <motion.div style={{ y: imageY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
            <Image 
              src={product.image}
              alt="Indrayani Rice Macro"
              fill
              sizes="100vw"
              className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            />
          </motion.div>
          
          {/* Subtle noise/texture overlay for the image */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
