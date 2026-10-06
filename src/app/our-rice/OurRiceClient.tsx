'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { images } from '@/data/images';
import { useParams } from 'next/navigation';

export default function OurRiceClient({ dict }: { dict: { ourRicePage?: Record<string, string> } }) {
  const t = dict?.ourRicePage || {
    eyebrow: "OUR RICE",
    title: "INDRAYANI RICE",
    subtitle: "इंद्रायणी तांदूळ",
    description: "Indrayani Rice from Pavnanagar, Maval.",
    visualStory: "From the fields to the final grain, the story continues in every handful.",
    fromJourney: "FROM THE JOURNEY",
    exploreJourney: "EXPLORE THE JOURNEY →",
    availablePacking: "AVAILABLE PACKING",
    packing10kg: "10 KG",
    price10kg: "₹600",
    packing25kg: "25 KG",
    price25kg: "₹1,500",
    productInfo: "PRODUCT INFORMATION",
    varietyLabel: "Variety",
    varietyValue: "Indrayani",
    regionLabel: "Region",
    regionValue: "Pavnanagar, Maval",
    packingLabel: "Packing",
    packingValue: "10 KG / 25 KG",
    orderingLabel: "Ordering",
    orderingValue: "Enquiry based",
    enquireHeading: "LOOKING FOR INDRAYANI RICE?",
    enquireDesc: "Tell us what you need and get in touch directly.",
    enquireBtn: "ORDER ON WHATSAPP"
  };

  const params = useParams();
  const locale = params?.locale || 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Subtle parallax for the main hero image
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <main ref={containerRef} className="bg-[#f2ede4] min-h-screen text-[#2b2723] selection:bg-[#8a7d6d] selection:text-[#f2ede4]">
      
      {/* 01 PRODUCT INTRO */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* TEXT BLOCK */}
          <div className="w-full lg:w-[40%] flex flex-col pt-12">
            <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8a7d6d] mb-8 font-semibold">
              {t.eyebrow}
            </div>
            
            <h1 className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-serif leading-[0.85] tracking-tighter mb-4 text-[#2b2723]">
              {t.title.split(' ')[0]}<br/>
              {t.title.split(' ').slice(1).join(' ')}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif italic text-[#6b6255] mb-12">
              {t.subtitle}
            </h2>
            
            <p className="text-lg md:text-xl font-serif text-[#4a433c] leading-relaxed max-w-md border-l border-[#8a7d6d]/30 pl-6 py-2">
              {t.description}
            </p>
          </div>

          {/* VISUAL BLOCK */}
          <div className="w-full lg:w-[60%]">
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-[#e6dfd3]">
              <motion.div style={{ y: heroY }} className="w-full h-[120%] -top-[10%] relative">
                <Image 
                  src={images.journey.finalRice} 
                  alt={t.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* 02 GRAIN MACRO / VISUAL STORY */}
      <section className="py-24 bg-[#e6dfd3]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            
            <div className="w-full md:w-1/2 relative aspect-square overflow-hidden">
              <Image 
                src={images.rice.v03_cleanCloseUp} 
                alt="Grain Detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left py-12 px-6">
              <p className="text-2xl md:text-4xl font-serif leading-snug tracking-tight text-[#2b2723] max-w-lg">
                &quot;{t.visualStory}&quot;
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 03 FROM THE JOURNEY */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8a7d6d] mb-6 font-semibold">
            {t.fromJourney}
          </div>
          <h3 className="text-4xl md:text-5xl font-serif tracking-tighter mb-10 text-[#2b2723]">
            {t.title}
          </h3>
          <Link 
            href="/journey"
            className="inline-block border-b border-[#2b2723] text-[#2b2723] pb-1 text-sm font-sans uppercase tracking-[0.2em] hover:text-[#8a7d6d] hover:border-[#8a7d6d] transition-colors"
          >
            {t.exploreJourney}
          </Link>
        </div>
      </section>

      {/* 04 AVAILABLE PACKING & 05 PRODUCT INFORMATION */}
      <section className="py-24 bg-[#f2ede4] text-[#2b2723] border-t border-[#8a7d6d]/20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-24">
          
          <div className="w-full lg:w-1/2">
            <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8a7d6d] mb-12 font-semibold">
              {t.availablePacking}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 border border-[#8a7d6d]/30 p-12 flex flex-col items-center justify-center min-h-[250px] hover:bg-[#e6dfd3] transition-colors text-center">
                <span className="text-5xl md:text-6xl font-serif tracking-tighter mb-2">{t.packing10kg}</span>
                <span className="text-2xl font-serif tracking-wide text-[#4a433c] mb-6">{t.price10kg}</span>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8a7d6d]">{t.availablePacking}</span>
              </div>
              <div className="flex-1 border border-[#8a7d6d]/30 p-12 flex flex-col items-center justify-center min-h-[250px] hover:bg-[#e6dfd3] transition-colors text-center">
                <span className="text-5xl md:text-6xl font-serif tracking-tighter mb-2">{t.packing25kg}</span>
                <span className="text-2xl font-serif tracking-wide text-[#4a433c] mb-6">{t.price25kg}</span>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8a7d6d]">{t.availablePacking}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8a7d6d] mb-12 font-semibold">
              {t.productInfo}
            </div>
            <div className="border-t border-[#8a7d6d]/30 flex flex-col">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#8a7d6d]/30">
                <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#8a7d6d] mb-2 sm:mb-0">{t.varietyLabel}</span>
                <span className="text-xl font-serif tracking-wide">{t.varietyValue}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#8a7d6d]/30">
                <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#8a7d6d] mb-2 sm:mb-0">{t.regionLabel}</span>
                <span className="text-xl font-serif tracking-wide">{t.regionValue}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#8a7d6d]/30">
                <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#8a7d6d] mb-2 sm:mb-0">{t.packingLabel}</span>
                <span className="text-xl font-serif tracking-wide">{t.packingValue}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#8a7d6d]/30">
                <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#8a7d6d] mb-2 sm:mb-0">{t.orderingLabel}</span>
                <span className="text-xl font-serif tracking-wide">{t.orderingValue}</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 06 ENQUIRE TO ORDER */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#e6dfd3]">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-6 text-[#2b2723]">
            {t.enquireHeading}
          </h2>
          <p className="text-lg md:text-xl font-sans font-light text-[#4a433c] mb-12">
            {t.enquireDesc}
          </p>
          
          <a 
            href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#2b2723] text-[#f2ede4] px-12 py-5 text-sm font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#4a433c] transition-colors mb-8"
          >
            {t.enquireBtn}
          </a>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm font-sans uppercase tracking-[0.2em] text-[#6b6255]">
            <a href="tel:9370943298" className="hover:text-[#2b2723] transition-colors">9370943298</a>
            <span className="hidden sm:inline">·</span>
            <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[#2b2723] transition-colors lowercase">unmeshrisbud345@gmail.com</a>
          </div>
        </div>
      </section>

    </main>
  );
}
