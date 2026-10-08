import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';

export default function RiceJourney({ locale }: { locale: Locale }) {
  const s1 = journeyStagesData[0]; // SEED
  const s2 = journeyStagesData[3]; // LAVNI
  const s3 = journeyStagesData[4]; // GROW
  const s4 = journeyStagesData[5]; // HARVEST
  const s5 = journeyStagesData[9]; // RICE

  return (
    <section id="journey" className="w-full bg-[var(--color-parchment)] py-24 md:py-48 text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex-1">
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-charcoal)]/60 mb-6 block">
              THE JOURNEY
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-serif leading-[0.9] tracking-tighter text-[var(--color-charcoal)]">
              FROM SEED<br/>TO GRAIN
            </h2>
          </div>
          
          <div className="flex-1 lg:max-w-xs pb-2 border-b border-[var(--color-charcoal)]/20">
            <Link 
              href="/journey"
              className="group flex items-center justify-between text-xs font-sans uppercase tracking-[0.2em] font-medium"
            >
              <span>EXPLORE THE 10 STAGES</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Editorial Sequence */}
        <div className="relative w-full flex flex-col gap-24 md:gap-40">
          
          {/* Continuous vertical line for desktop to connect chapters visually */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-px bg-[var(--color-charcoal)]/10" />

          {/* 01 SEED */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end lg:text-right">
              <span className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)]/20 leading-none mb-4">01</span>
              <h3 className="text-4xl md:text-5xl font-serif mb-4">SEED</h3>
              <p className="text-sm font-sans tracking-widest uppercase opacity-70 max-w-xs">{s1.desc}</p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                <Image src={s1.image} alt="Seed" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>

          {/* 02 LAVNI */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <span className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)]/20 leading-none mb-4">02</span>
              <h3 className="text-4xl md:text-5xl font-serif mb-4">LAVNI</h3>
              <p className="text-sm font-sans tracking-widest uppercase opacity-70 max-w-xs">{s2.desc}</p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-end">
              <div className="relative w-full md:w-[80%] aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <Image src={s2.image} alt="Lavni" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
          </div>

          {/* 03 GROW */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end lg:text-right">
              <span className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)]/20 leading-none mb-4">03</span>
              <h3 className="text-4xl md:text-5xl font-serif mb-4">GROW</h3>
              <p className="text-sm font-sans tracking-widest uppercase opacity-70 max-w-xs">{s3.desc}</p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[21/9] overflow-hidden">
                <Image src={s3.image} alt="Grow" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>

          {/* 04 HARVEST */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <span className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)]/20 leading-none mb-4">04</span>
              <h3 className="text-4xl md:text-5xl font-serif mb-4">HARVEST</h3>
              <p className="text-sm font-sans tracking-widest uppercase opacity-70 max-w-xs">{s4.desc}</p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-end">
              <div className="relative w-full md:w-[80%] aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <Image src={s4.image} alt="Harvest" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
          </div>

          {/* 05 RICE */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end lg:text-right">
              <span className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)]/20 leading-none mb-4">05</span>
              <h3 className="text-4xl md:text-5xl font-serif mb-4">RICE</h3>
              <p className="text-sm font-sans tracking-widest uppercase opacity-70 max-w-xs">{s5.desc}</p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full md:w-[90%] aspect-square overflow-hidden">
                <Image src={s5.image} alt="Rice" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
