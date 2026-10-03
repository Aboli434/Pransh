import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { galleryData } from '@/data/gallery';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <main className="pt-32 pb-24 bg-[var(--color-ivory)] min-h-screen">
      <Container>
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] mb-6">
            The Land Behind PRANSH.
          </h1>
          <p className="text-xl text-[var(--color-charcoal)]/70 font-light">
            A closer look at the fields, the seasons, the work, and the moments behind the harvest.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item) => (
            <div key={item.id} className={`relative group overflow-hidden ${item.featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <div className={`relative w-full ${item.featured ? 'aspect-square md:aspect-[16/9]' : 'aspect-square'}`}>
                <Image 
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="text-xs uppercase tracking-widest text-[var(--color-champagne)] font-bold">
                  {item.captionKey ? (dict.farmGallery?.captions as Record<string, string>)?.[item.captionKey] : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
