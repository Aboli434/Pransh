import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { farmerData } from '@/data/farmer';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default async function OurStoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <main className="pt-24 pb-20 bg-[var(--color-ivory)] min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--color-champagne)]"></span>
            <span className="text-sm uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
              OUR STORY
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] mb-12">
            A Life Rooted in the Land.
          </h1>
          
          <div className="relative w-full aspect-[16/9] mb-16 overflow-hidden shadow-2xl">
            <Image 
              src={farmerData.farmImage}
              alt="Farm Landscape"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="prose prose-lg max-w-none text-[var(--color-charcoal)]/80 text-center mx-auto max-w-3xl">
            <p className="mb-6">PRANSH represents a direct link between the fertile soils of Maval and your dining table. Our commitment to authentic agricultural practices ensures that every grain of Indrayani rice carries the true essence of its origin.</p>
            <p>Our journey is rooted in respect for the land, honoring traditional methods while delivering premium quality directly from the source.</p>
          </div>
        </div>
      </Container>
    </main>
  );
}
