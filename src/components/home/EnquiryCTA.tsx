'use client';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  return (
    <section className="w-full bg-[var(--color-charcoal)] py-32 md:py-48 flex items-center justify-center text-[var(--color-ivory)] relative">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-12 text-center relative z-10">
        
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-semibold text-[var(--color-champagne)] mb-8">
          LOOKING FOR INDRAYANI RICE?
        </p>

        <h2 className="text-4xl md:text-6xl font-serif leading-[1.2] mb-8 text-[var(--color-ivory)]/90">
          Available in 10 KG and 25 KG packing.<br className="hidden md:block"/> Get in touch with PRANSH for ordering and availability.
        </h2>

        <div className="flex flex-col items-center gap-12 mt-16">
          <Link 
            href={`/${locale}/contact`}
            className="bg-[var(--color-forest)] text-[var(--color-ivory)] px-12 py-5 text-sm font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-ivory)] hover:text-[var(--color-forest)] transition-colors inline-block"
          >
            ENQUIRE TO ORDER
          </Link>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-sm font-sans tracking-widest opacity-80 uppercase">
            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-champagne)] opacity-70">Phone</span>
              <a href="tel:9370943298" className="hover:text-[var(--color-champagne)] transition-colors">9370943298</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-champagne)] opacity-70">Email</span>
              <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors">unmeshrisbud345@gmail.com</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-champagne)] opacity-70">Location</span>
              <span>Pavnanagar, Kale Colony, 410406</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
