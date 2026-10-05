import Container from '@/components/ui/Container';
import { contactData } from '@/data/contact';

export default async function ContactPage() {
  return (
    <main className="pt-32 pb-32 bg-[var(--color-charcoal)] min-h-[90vh] flex items-center text-[var(--color-ivory)]">
      <Container>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          
          <div className="w-full md:w-auto">
            <h1 className="text-[12vw] md:text-[140px] font-serif leading-[0.8] tracking-tighter mb-4">
              LET&apos;S
              <br />
              <span className="italic font-light text-[var(--color-champagne)]">TALK.</span>
            </h1>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-12 font-medium">
            <div className="flex flex-col gap-2">
              <a 
                href={`tel:${contactData.phone}`} 
                className="text-4xl md:text-5xl font-serif hover:text-[var(--color-champagne)] transition-colors inline-block"
              >
                {contactData.phone}
              </a>
              <a 
                href={`mailto:${contactData.email}`} 
                className="text-xl md:text-2xl font-light hover:text-[var(--color-champagne)] transition-colors inline-block"
              >
                {contactData.email}
              </a>
            </div>

            <div className="flex flex-col gap-1 text-sm uppercase tracking-widest text-[var(--color-ivory)]/60">
              <span>{contactData.address}</span>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}
