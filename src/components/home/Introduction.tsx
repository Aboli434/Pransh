
export default function Introduction() {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-parchment)] text-[var(--color-charcoal)] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col items-center text-center">
        
        {/* Small metadata / label */}
        <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-charcoal)]/60 mb-12 block">
          FROM PAVNANAGAR · MAVAL
        </span>

        {/* Thin vertical line */}
        <div className="w-px h-16 md:h-24 bg-[var(--color-charcoal)]/20 mb-12"></div>
        
        {/* Huge serif statement */}
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[1.1] tracking-tighter text-[var(--color-charcoal)] max-w-5xl mx-auto mb-16">
          "Indrayani rice,<br/>
          <span className="italic font-light opacity-90">rooted in the land</span><br/>
          where it begins."
        </h2>

        {/* Short explanation paragraph */}
        <p className="max-w-md mx-auto text-sm md:text-base font-sans leading-relaxed text-[var(--color-charcoal)]/80">
          PRANSH brings Indrayani rice from Pavnanagar, Maval directly to people through a simple enquiry-based ordering experience.
        </p>

      </div>
    </section>
  );
}
