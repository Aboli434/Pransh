'use client';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

import Image from 'next/image';
import { images } from '@/data/images';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  return (
    <section className="w-full bg-[var(--color-ivory)] pb-24 md:pb-48">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
        <div className="relative w-full min-h-[80vh] flex flex-col md:flex-row overflow-hidden bg-[var(--color-charcoal)]">
          
          {/* Background / Left Image */}
          <div className="absolute inset-0 md:relative md:w-1/2 h-full min-h-[50vh]">
            <Image 
              src={images.hero}
              alt="Farm Landscape"
              fill
              className="object-cover opacity-40 md:opacity-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay for mobile text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/40 to-transparent md:hidden" />
          </div>

          {/* Right Text Content */}
          <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 text-[var(--color-ivory)] mt-auto md:mt-0">
            
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-serif leading-[0.9] tracking-tighter mb-12">
              INDRAYANI<br/>RICE<br/>
              <span className="text-3xl md:text-5xl lg:text-6xl text-[var(--color-ivory)]/70 italic font-light">FROM MAVAL.</span>
            </h2>

            <div className="flex flex-col gap-4 text-sm md:text-base font-sans uppercase tracking-[0.2em] text-[var(--color-ivory)]/90 mb-16 font-medium w-full max-w-sm">
              <div className="flex justify-between items-center border-b border-[var(--color-ivory)]/20 pb-4">
                <span>10 KG</span>
                <span>₹600</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--color-ivory)]/20 pb-4">
                <span>25 KG</span>
                <span>₹1,500</span>
              </div>
            </div>

            <a 
              href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-ivory)] text-[var(--color-charcoal)] px-10 py-5 text-[10px] font-sans uppercase tracking-[0.3em] font-bold hover:bg-transparent hover:text-[var(--color-ivory)] hover:outline hover:outline-1 hover:outline-[var(--color-ivory)] transition-all text-center mb-12"
            >
              ORDER ON WHATSAPP
            </a>

            <div className="flex flex-col gap-4 text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase opacity-80">
              <a href="tel:9370943298" className="hover:text-white transition-colors">9370943298</a>
              <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-white transition-colors lowercase">unmeshrisbud345@gmail.com</a>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
