'use client';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  return (
    <section id="contact" className="w-full bg-[var(--color-charcoal)] py-32 md:py-48 flex items-center justify-center text-[var(--color-ivory)] relative overflow-hidden">
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12 text-center relative z-10">
        
        <p className="text-xs uppercase tracking-[0.4em] font-medium text-[var(--color-champagne)] mb-8">
          The Final Step
        </p>

        <h2 className="text-[10vw] md:text-[120px] font-serif leading-[0.85] tracking-tighter mb-16">
          START A <br />
          <span className="italic font-light text-[var(--color-ivory)]/70">CONVERSATION.</span>
        </h2>

        <Link 
          href={`/${locale}/contact`}
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
            Reach Out
          </span>
          <span className="w-px h-16 bg-[var(--color-ivory)]/30 group-hover:bg-[var(--color-champagne)] group-hover:h-24 transition-all duration-500 ease-out" />
        </Link>
        
      </div>
    </section>
  );
}
