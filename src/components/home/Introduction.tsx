import Container from '../ui/Container';
import { Locale } from '@/i18n/config';

export default function Introduction() {
  return (
    <section className="py-32 md:py-48 bg-[var(--color-ivory)] relative z-10 text-[var(--color-charcoal)]">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
          
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tighter flex-1">
            THE LAND<br />
            <span className="italic font-light text-[var(--color-champagne)]">HAS ITS</span><br />
            OWN RHYTHM.
          </h2>

          <div className="flex-1 max-w-sm">
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-80">
              PRANSH is rooted in the relationship between a farmer, the land, and the grain that reaches the table. No shortcuts, just authentic cultivation.
            </p>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
