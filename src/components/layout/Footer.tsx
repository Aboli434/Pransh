import Link from 'next/link';
import { Locale } from '@/i18n/config';
import Logo from '@/components/ui/Logo';

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-[var(--color-forest)] text-[var(--color-ivory)] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="flex flex-col max-w-sm">
            <div className="mb-4 -ml-4">
              <Logo className="w-48 md:w-64 h-auto" />
            </div>
            <div className="text-xl md:text-2xl font-serif tracking-widest text-[var(--color-champagne)] mb-6">
              INDRAYANI RICE
            </div>
            <p className="text-sm font-sans uppercase tracking-widest opacity-80 leading-relaxed">
              From the farm to your table.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            {/* Navigation */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">Navigation</h4>
              <nav className="flex flex-col gap-4 text-sm font-sans tracking-widest uppercase opacity-90">
                <Link href="/our-story" className="hover:text-[var(--color-champagne)] transition-colors">Our Story</Link>
                <Link href="/journey" className="hover:text-[var(--color-champagne)] transition-colors">The Journey</Link>
                <Link href="/our-rice" className="hover:text-[var(--color-champagne)] transition-colors">Our Rice</Link>
                <Link href="/gallery" className="hover:text-[var(--color-champagne)] transition-colors">Gallery</Link>
              </nav>
            </div>

            {/* Contact & Packing */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">Contact</h4>
                <div className="flex flex-col gap-4 text-sm font-sans tracking-widest uppercase opacity-90">
                  <a href="tel:9370943298" className="hover:text-[var(--color-champagne)] transition-colors">9370943298</a>
                  <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors lowercase">unmeshrisbud345@gmail.com</a>
                  <span className="leading-relaxed">Pavnanagar<br/>Kale Colony<br/>410406</span>
                </div>
              </div>


            </div>

            {/* Final CTA */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">Order</h4>
              <a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-champagne)] text-[var(--color-charcoal)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-ivory)] transition-colors inline-block text-center mt-2"
              >
                ENQUIRE TO ORDER →
              </a>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--color-ivory)]/20 flex flex-col justify-center items-center gap-6 text-xs font-sans uppercase tracking-[0.2em] opacity-80">
          <p>© {new Date().getFullYear()} PRANSH</p>
        </div>
        
      </div>
    </footer>
  );
}
