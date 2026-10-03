import Container from '@/components/ui/Container';

export default async function ContactPage() {

  return (
    <main className="pt-32 pb-20 bg-[var(--color-charcoal)] min-h-screen flex items-center">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-ivory)] mb-6">
            Start a Conversation.
          </h1>
          <p className="text-xl text-[var(--color-ivory)]/80 font-light mb-16">
            Interested in Indrayani Rice? Get in touch directly with the farm.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="tel:placeholder" className="p-12 bg-[var(--color-ivory)]/5 border border-[var(--color-ivory)]/10 hover:bg-[var(--color-ivory)]/10 transition-colors">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-champagne)] mb-4">Call</h3>
              <p className="text-2xl font-serif text-[var(--color-ivory)]">[PHONE NUMBER]</p>
            </a>
            <a href="mailto:placeholder" className="p-12 bg-[var(--color-ivory)]/5 border border-[var(--color-ivory)]/10 hover:bg-[var(--color-ivory)]/10 transition-colors">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-champagne)] mb-4">Email</h3>
              <p className="text-2xl font-serif text-[var(--color-ivory)]">[EMAIL ADDRESS]</p>
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
