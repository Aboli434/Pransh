import { Locale } from '@/i18n/config';
import Image from 'next/image';
import { images } from '@/data/images';

export default async function OurStoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <main className="pt-32 md:pt-48 pb-24 bg-[var(--color-parchment)] text-[var(--color-charcoal)] min-h-screen font-sans">
      
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-12 mb-24 md:mb-48 text-center">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold opacity-60 mb-8 block">
          OUR STORY
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-serif leading-[0.9] tracking-tighter max-w-4xl mx-auto mb-12">
          "From a field in Pavnanagar to the grain on your table."
        </h1>
      </section>

      {/* 01. THE LAND */}
      <section className="w-full flex flex-col md:flex-row min-h-[80vh] bg-[var(--color-charcoal)] text-[var(--color-parchment)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">01.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE LAND</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            Situated in Maval, Western Maharashtra. The distinct geography and climate of Pavnanagar provide the essential foundation for cultivating authentic Indrayani rice.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.hero} alt="The Land" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* 02. THE SEED */}
      <section className="w-full flex flex-col md:flex-row-reverse min-h-[80vh] bg-[var(--color-parchment)] text-[var(--color-charcoal)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end md:text-right p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">02.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE SEED</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            The foundation of quality. Carefully selected Indrayani seeds are prepared and sown in the nursery before making their way into the fields.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.journey.seed} alt="The Seed" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* 03. THE FIELD */}
      <section className="w-full flex flex-col md:flex-row min-h-[80vh] bg-[var(--color-charcoal)] text-[var(--color-parchment)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">03.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE FIELD</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            Prepared and flooded. Young seedlings are carefully transplanted (Lavni) into the puddled fields by hand, continuing a traditional agricultural practice.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.journey.lavni} alt="The Field" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* 04. THE CROP */}
      <section className="w-full flex flex-col md:flex-row-reverse min-h-[80vh] bg-[var(--color-parchment)] text-[var(--color-charcoal)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end md:text-right p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">04.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE CROP</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            Tended with careful precision. The paddy develops its signature aroma and texture during the critical growing months under the Western Ghats sky.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.journey.growing} alt="The Crop" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* 05. THE HARVEST */}
      <section className="w-full flex flex-col md:flex-row min-h-[80vh] bg-[var(--color-charcoal)] text-[var(--color-parchment)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">05.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE HARVEST</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            When the crop turns golden, it is carefully harvested. The paddy is then dried under the sun and prepared for milling.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.journey.harvesting} alt="The Harvest" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* 06. THE GRAIN */}
      <section className="w-full flex flex-col md:flex-row-reverse min-h-[80vh] bg-[var(--color-earth)] text-[var(--color-parchment)]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end md:text-right p-8 md:p-16 lg:p-24">
          <span className="text-4xl md:text-6xl font-serif text-[var(--color-gold)] mb-8">06.</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">THE GRAIN</h2>
          <p className="text-sm md:text-base tracking-widest uppercase opacity-80 leading-relaxed max-w-sm">
            Cleaned, milled, and graded. The final result is a pristine Indrayani grain known for its distinct stickiness and fragrance. Sourced directly from our fields to your table.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh]">
          <Image src={images.journey.finalRice} alt="The Grain" fill className="object-cover opacity-90 mix-blend-luminosity" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

    </main>
  );
}
