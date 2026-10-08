'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { images } from '@/data/images';

export default function GalleryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(1);

  // Chapters refs
  const landRef = useRef<HTMLDivElement>(null);
  const handsRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!landRef.current || !handsRef.current || !grainRef.current) return;
      
      const scrollY = window.scrollY;
      const handsTop = handsRef.current.offsetTop - window.innerHeight / 2;
      const grainTop = grainRef.current.offsetTop - window.innerHeight / 2;

      if (scrollY >= grainTop) {
        setActiveChapter(3);
      } else if (scrollY >= handsTop) {
        setActiveChapter(2);
      } else {
        setActiveChapter(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (chapter: number) => {
    let ref = landRef;
    if (chapter === 2) ref = handsRef;
    if (chapter === 3) ref = grainRef;

    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Image zoom interaction on scroll (subtle)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background color interpolation for narrative progression
  // Land (green/earth) -> Hands (brown/clay) -> Grain (ivory/white)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    ['var(--color-parchment)', 'var(--color-terracotta)', 'var(--color-charcoal)']
  );

  return (
    <motion.main 
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen relative text-[var(--color-charcoal)] transition-colors duration-1000 ease-out"
    >
      
      {/* Editorial Intro */}
      <section className="pt-48 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <span className="text-xs font-sans uppercase tracking-[0.3em] font-semibold opacity-60 mb-8 block">
          PRANSH / VISUAL ARCHIVE
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-tight mb-8">
          THE BEGINNING.<br/>
          THE FIELD.<br/>
          THE GRAIN.
        </h1>
        <p className="text-lg md:text-xl font-serif tracking-wide opacity-80 max-w-md mx-auto italic">
          “A closer look at the fields, the work and the grain behind PRANSH.”
        </p>
      </section>

      {/* Sticky Chapter Navigation */}
      <div className="sticky top-24 z-40 w-full px-4 md:px-12 flex justify-center pointer-events-none mix-blend-difference text-[var(--color-parchment)]">
        <nav className="inline-flex items-center gap-8 md:gap-16 text-xs font-sans uppercase tracking-[0.2em] font-semibold pointer-events-auto">
          {[
            { num: 1, label: 'THE BEGINNING' },
            { num: 2, label: 'THE FIELD' },
            { num: 3, label: 'THE GRAIN' }
          ].map((chap) => (
            <button
              key={chap.num}
              onClick={() => scrollToChapter(chap.num)}
              className={`transition-opacity duration-300 hover:opacity-100 ${activeChapter === chap.num ? 'opacity-100 border-b border-current pb-1' : 'opacity-40'}`}
            >
              0{chap.num} {chap.label}
            </button>
          ))}
        </nav>
      </div>

      {/* CHAPTER 01: THE BEGINNING */}
      <section ref={landRef} className="pt-24 pb-32 flex flex-col items-center w-full">
        <div className="text-center mb-24 px-6">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-4">
            01<br/>THE BEGINNING
          </h2>
          <p className="text-lg font-serif italic opacity-80">
            “The foundation of every harvest.”
          </p>
        </div>
        
        {/* Sequence */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start justify-center">
          <GalleryImage 
            src={images.journey.seed}
            alt="Seed selection"
            aspectRatio="aspect-[4/3]"
            width="w-full md:w-5/12"
            label="THE BEGINNING"
            caption="SEED SELECTION"
          />
          <div className="w-full md:w-6/12 flex flex-col gap-24 md:mt-48">
            <GalleryImage 
              src={images.journey.nursery}
              alt="Rice nursery"
              aspectRatio="aspect-[4/3]"
              width="w-full md:w-10/12 ml-auto"
              label="THE BEGINNING"
              caption="THE NURSERY"
            />
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 mt-24 md:mt-32">
          <GalleryImage 
            src={images.journey.fieldPrep}
            alt="Field preparation"
            aspectRatio="aspect-[21/9]"
            width="w-full"
            label="THE BEGINNING"
            caption="FIELD PREPARATION"
          />
        </div>
      </section>

      {/* CHAPTER 02: THE FIELD */}
      <section ref={handsRef} className="pt-32 pb-32 flex flex-col items-center w-full bg-[var(--color-charcoal)]/5">
        <div className="text-center mb-24 px-6">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-4">
            02<br/>THE FIELD
          </h2>
          <p className="text-lg font-serif italic opacity-80">
            “The work of the season.”
          </p>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <GalleryImage 
              src={images.journey.lavni} 
              alt="Transplanting rice seedlings"
              aspectRatio="aspect-[16/9]"
              width="w-full md:w-7/12"
              label="THE FIELD"
              caption="LAVNI / TRANSPLANTING"
            />
            <div className="w-full md:w-4/12 flex justify-center md:justify-end">
              <GalleryImage 
                src={images.journey.growing} 
                alt="Growing paddy crop"
                aspectRatio="aspect-[3/4]"
                width="w-3/4 md:w-full"
                label="THE FIELD"
                caption="CROP GROWTH"
              />
            </div>
          </div>
          
          <div className="flex justify-center w-full">
            <GalleryImage 
              src={images.journey.harvesting}
              alt="Harvesting mature rice"
              aspectRatio="aspect-[21/9]"
              width="w-full"
              label="THE FIELD"
              caption="THE HARVEST"
            />
          </div>
        </div>
      </section>

      {/* CHAPTER 03: THE GRAIN */}
      <section ref={grainRef} className="pt-32 pb-0 flex flex-col items-center w-full">
        <div className="text-center mb-24 px-6">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-4">
            03<br/>THE GRAIN
          </h2>
          <p className="text-lg font-serif italic opacity-80">
            “From the field to the final grain.”
          </p>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-32 items-center">
          
          <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-center md:items-end">
            <GalleryImage 
              src={images.journey.drying} 
              alt="Threshing and drying"
              aspectRatio="aspect-[16/9]"
              width="w-full md:w-6/12"
              label="THE GRAIN"
              caption="THRESHING & DRYING"
            />
            <GalleryImage 
              src={images.journey.milling} 
              alt="Milling process"
              aspectRatio="aspect-square"
              width="w-10/12 md:w-5/12 mb-12 md:mb-0"
              label="THE GRAIN"
              caption="MILLING / DEHUSKING"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-start">
            <GalleryImage 
              src={images.journey.cleaning} 
              alt="Cleaning and grading"
              aspectRatio="aspect-[16/9]"
              width="w-full md:w-8/12"
              label="THE GRAIN"
              caption="CLEANING & GRADING"
            />
          </div>

        </div>
      </section>

      {/* FINAL FULL-WIDTH IMAGE & CTA */}
      <section className="pt-32 w-full flex flex-col items-center">
        <div className="w-full h-screen relative flex items-center justify-center overflow-hidden">
          <Image 
            src={images.rice.v03_cleanCloseUp} // rice-grain-macro.jpg
            alt="Close-up macro shot of Indrayani rice grains"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
          
          <div className="relative z-10 text-center flex flex-col items-center text-[var(--color-parchment)] px-6">
            <h2 className="text-6xl md:text-9xl font-serif tracking-widest mb-4">
              PRANSH
            </h2>
            <p className="text-2xl md:text-4xl font-serif mb-12">
              इंद्रायणी तांदूळ
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-2 text-sm font-sans uppercase tracking-[0.3em] font-medium opacity-90">
                <span>10 KG — ₹600</span>
                <span>25 KG — ₹1,500</span>
              </div>
              
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white text-white px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-colors"
              >
                ENQUIRE TO ORDER
              </a>

              <div className="flex flex-col items-center gap-2 mt-4 text-xs font-sans tracking-[0.2em] opacity-80">
                <a href="tel:9370943298" className="hover:opacity-100 transition-opacity">9370943298</a>
                <a href="mailto:unmeshrisbud345@gmail.com" className="lowercase hover:opacity-100 transition-opacity">unmeshrisbud345@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </motion.main>
  );
}

// Reusable editorial image component with hover interactions and subtle scroll scaling
function GalleryImage({ 
  src, 
  alt, 
  aspectRatio, 
  width, 
  label, 
  caption,
  overlayTitle = false
}: { 
  src: string; 
  alt: string; 
  aspectRatio: string; 
  width: string; 
  label?: string; 
  caption?: string;
  overlayTitle?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <div ref={container} className={`group flex flex-col gap-4 ${width}`}>
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-black/5`}>
        <motion.div style={{ scale }} className="w-full h-full relative">
          <Image 
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </motion.div>

        {overlayTitle && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/20">
            <span className="text-xl md:text-3xl font-serif mb-2">01</span>
            <h2 className="text-6xl md:text-9xl font-serif tracking-widest text-center">THE LAND</h2>
          </div>
        )}

        {/* Hover caption for desktop */}
        {!overlayTitle && label && caption && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white pointer-events-none">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-semibold mb-2">
              {label}
            </span>
            <span className="text-lg font-serif italic tracking-wide">
              {caption}
            </span>
          </div>
        )}
      </div>
      
      {/* Mobile visible caption, or fallback */}
      {!overlayTitle && (
        <div className="md:hidden flex flex-col text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-semibold opacity-60">
            {label}
          </span>
          <span className="text-sm font-serif italic">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}
