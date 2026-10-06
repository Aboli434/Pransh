import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';

export default function RiceJourney({ locale }: { locale: Locale }) {
  // Select 4 exact preview stages requested
  const previewStages = [
    journeyStagesData[0], // Seed Selection
    journeyStagesData[2], // Growing (Field)
    journeyStagesData[3], // Harvesting
    journeyStagesData[7], // Final Rice
  ];

  return (
    <section id="journey" className="w-full bg-[var(--color-charcoal)] py-24 md:py-48 text-[var(--color-ivory)]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 text-center md:text-left">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[var(--color-champagne)] mb-4 block">
              THE JOURNEY
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-[80px] font-serif leading-[1] tracking-tighter">
              FROM SEED TO GRAIN
            </h2>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-sm font-sans uppercase tracking-[0.3em] opacity-60">
              8 STAGES
            </span>
            <Link 
              href="/journey"
              className="inline-block text-xs uppercase tracking-[0.2em] border-b border-[var(--color-ivory)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
            >
              EXPLORE THE FULL JOURNEY →
            </Link>
          </div>
        </div>

        {/* Visual Sequence */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-8 mt-12">
          {previewStages.map((stage, idx) => {
            const stepNum = idx === 0 ? "01" : idx === 1 ? "02" : idx === 2 ? "03" : "04";
            const shortTitle = idx === 0 ? "SOW" : idx === 1 ? "GROW" : idx === 2 ? "HARVEST" : "RICE";

            return (
              <div key={stage.id} className="flex-1 flex flex-col group">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
                  <Image 
                    src={stage.image}
                    alt={stage.title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Remove the dark gradient overlay since the text is now below */}
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-serif italic text-[var(--color-ivory)]/30 leading-none">
                    {stepNum}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl tracking-wide mb-2 text-[var(--color-ivory)]">{shortTitle}</h3>
                    <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ivory)]/60 font-medium max-w-[200px]">
                      {stage.desc.split('.')[0]}.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
