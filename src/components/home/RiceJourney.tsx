import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';

export default function RiceJourney({ locale }: { locale: Locale }) {
  // Select 3 preview stages
  const previewStages = [
    journeyStagesData[1], // Sowing
    journeyStagesData[3], // Harvesting
    journeyStagesData[7], // Final Rice
  ];

  return (
    <section id="journey" className="w-full bg-[var(--color-charcoal)] py-24 md:py-48">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Header Question */}
        <div className="mb-16 md:mb-32">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
            THE JOURNEY
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Visual Sequence */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4 h-[60vh] md:h-[500px]">
            {previewStages.map((stage, idx) => (
              <div key={stage.id} className="relative flex-1 h-full overflow-hidden group">
                <Image 
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 z-10 text-[var(--color-ivory)]">
                  <span className="block text-xs uppercase tracking-widest font-semibold opacity-80 mb-1">
                    0{idx === 0 ? 2 : idx === 1 ? 4 : 8}
                  </span>
                  <span className="block font-serif text-lg tracking-wide">{stage.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Text Sequence Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-6 text-xl md:text-3xl font-serif text-[var(--color-ivory)] leading-[1.2] mb-16">
              {journeyStagesData.map((stage, idx) => (
                <div key={stage.id} className="flex items-center gap-4">
                  <span className="opacity-80 hover:text-[var(--color-champagne)] transition-colors cursor-default">
                    {stage.title}
                  </span>
                  {idx < journeyStagesData.length - 1 && (
                    <span className="text-[var(--color-champagne)] font-sans text-sm opacity-50">→</span>
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <Link 
                href={`/${locale}/journey`}
                className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)] border-b border-[var(--color-ivory)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
              >
                ENTER THE FULL JOURNEY
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
