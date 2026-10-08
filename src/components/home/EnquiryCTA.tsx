'use client';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import Image from 'next/image';
import { images } from '@/data/images';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  return (
    <section className="w-full bg-[var(--color-terracotta)] text-[var(--color-parchment)] relative overflow-hidden">
      
      {/* Editorial Split Layout */}
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 z-10">
          
          <h2 className="text-6xl md:text-8xl lg:text-[110px] font-serif leading-[0.85] tracking-tighter mb-12">
            INDRAYANI<br/>RICE<br/>
            <span className="text-4xl md:text-6xl lg:text-[80px] italic font-light opacity-90">FROM MAVAL.</span>
          </h2>

          <div className="w-full h-px bg-[var(--color-parchment)]/30 mb-12"></div>

          <div className="flex flex-col gap-6 text-sm md:text-base font-sans uppercase tracking-[0.2em] font-medium w-full max-w-sm mb-16">
            <div className="flex justify-between items-end">
              <span className="opacity-80 text-xs">10 KG</span>
              <span className="text-3xl font-serif">₹600</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-80 text-xs">25 KG</span>
              <span className="text-3xl font-serif">₹1,500</span>
            </div>
          </div>

          <a 
            href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[var(--color-parchment)] text-[var(--color-parchment)] px-12 py-5 text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-parchment)] hover:text-[var(--color-terracotta)] transition-colors text-center mb-16"
          >
            ORDER ON WHATSAPP
          </a>

          <div className="flex flex-col gap-4 text-xs font-sans tracking-[0.3em] uppercase opacity-90">
            <a href="tel:9370943298" className="hover:opacity-60 transition-opacity">9370943298</a>
            <a href="mailto:unmeshrisbud345@gmail.com" className="hover:opacity-60 transition-opacity lowercase">unmeshrisbud345@gmail.com</a>
          </div>
          
        </div>

        {/* Right: Full Bleed Subtley Placed Image */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-auto relative bg-[var(--color-earth)]">
          <Image 
            src={images.gallery[5]}
            alt="Farm Context"
            fill
            className="object-cover opacity-90 mix-blend-luminosity"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Blend edge into the terracotta */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-terracotta)] to-transparent hidden md:block" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-terracotta)] to-transparent md:hidden" />
        </div>
        
      </div>

    </section>
  );
}
