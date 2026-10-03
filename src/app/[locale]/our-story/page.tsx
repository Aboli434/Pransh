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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 relative aspect-[3/4]">
              <Image 
                src={farmerData.portrait}
                alt={farmerData.name}
                fill
                className="object-cover shadow-xl"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="md:col-span-7 prose prose-lg text-[var(--color-charcoal)]/80">
              <h2 className="text-3xl font-serif text-[var(--primary)] mb-4">{farmerData.name}</h2>
              <p className="text-sm text-[var(--color-champagne)] tracking-widest uppercase mb-8">{farmerData.location}</p>
              <p>{dict.farmer.storyPlaceholder}</p>
              <p>This is where the real story of PRANSH will be written, explaining the authentic connection between the farmer, the land, and the Indrayani Rice cultivated here.</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
