'use client';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  return (
    <section id="contact" className="w-full bg-[var(--color-charcoal)] py-32 md:py-48 flex items-center justify-center text-[var(--color-ivory)] relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-12 text-center relative z-10">
        
        <p className="text-xs uppercase tracking-[0.4em] font-semibold text-[var(--color-champagne)] mb-8">
          LOOKING FOR INDRAYANI RICE?
        </p>

        <h2 className="text-5xl md:text-7xl font-serif leading-[1] tracking-tighter mb-16">
          START AN ENQUIRY
        </h2>

        <div className="flex flex-col gap-6 text-lg md:text-xl font-light opacity-90 mb-16">
          <a href="tel:9370943298" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
            Phone: 9370943298
          </a>
          <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
            Email: unmeshrisbud345@gmail.com
          </a>
          <div className="mt-4 text-base opacity-70">
            <span className="block">Location:</span>
            <span className="block">Pavnanagar, Kale Colony, 410406</span>
          </div>
        </div>

        <Link 
          href={`/${locale}/contact`}
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-ivory)] border-b border-[var(--color-ivory)] pb-1 group-hover:text-[var(--color-champagne)] group-hover:border-[var(--color-champagne)] transition-colors">
            START AN ENQUIRY
          </span>
        </Link>
        
      </div>
    </section>
  );
}
