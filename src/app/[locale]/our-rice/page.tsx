import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { productsData } from '@/data/products';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default async function OurRicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <main className="pt-24 pb-20 bg-[var(--color-warm-beige)] min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] bg-[var(--color-charcoal)] shadow-2xl overflow-hidden">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-[var(--color-champagne)]"></span>
                <span className="text-sm uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
                  {dict.riceProduct.eyebrow}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] mb-4">
                {product.name}.
              </h1>
              <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-sage)] italic mb-10">
                {product.variety}
              </h2>
              
              <div className="prose prose-lg text-[var(--color-charcoal)]/80 mb-12">
                <p>{product.description}</p>
              </div>

              <div className="bg-[var(--color-ivory)] p-8 border border-[var(--color-sage)]/20">
                <h3 className="text-xs uppercase tracking-widest text-[var(--color-champagne)] font-bold mb-4">Availability</h3>
                <p className="text-[var(--color-charcoal)]">{product.availability}</p>
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </main>
  );
}
