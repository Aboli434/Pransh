import Container from '../ui/Container';

export default function Introduction() {
  return (
    <section className="py-32 md:py-48 bg-[var(--color-ivory)] relative z-10 text-[var(--color-charcoal)]">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
          
          <div className="flex-1">
            <span className="text-xs font-sans uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)] mb-8 block">
              ABOUT PRANSH
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tighter">
              A FARMER.<br />
              A FIELD.<br />
              <span className="italic font-light text-[var(--color-champagne)]">A GRAIN.</span>
            </h2>
          </div>

          <div className="flex-1 max-w-sm pt-8 md:pt-14">
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-80">
              PRANSH is an independent agricultural venture focused on bringing Indrayani rice directly from the farmer to people looking for a direct connection to the source.
            </p>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
