import Container from '@/components/ui/Container';

export default async function ContactPage() {
  return (
    <main className="pt-32 pb-32 bg-[var(--color-charcoal)] min-h-screen flex items-center justify-center text-[var(--color-ivory)]">
      <Container>
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          
          <p className="text-xs uppercase tracking-[0.4em] font-semibold text-[var(--color-champagne)] mb-8">
            LOOKING FOR INDRAYANI RICE?
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-serif leading-[1] tracking-tighter mb-16">
            START AN ENQUIRY
          </h1>
          
          <div className="flex flex-col gap-6 text-xl md:text-2xl font-light">
            <a 
              href="tel:9370943298" 
              className="hover:text-[var(--color-champagne)] transition-colors inline-block"
            >
              Phone: 9370943298
            </a>
            <a 
              href="mailto:unmeshrisbud345@gmail.com" 
              className="hover:text-[var(--color-champagne)] transition-colors inline-block"
            >
              Email: unmeshrisbud345@gmail.com
            </a>
            
            <div className="mt-8 text-lg opacity-80 uppercase tracking-widest text-[var(--color-ivory)]">
              <span className="block mb-2">Location:</span>
              <span className="block">Pavnanagar</span>
              <span className="block">Kale Colony</span>
              <span className="block">410406</span>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}
