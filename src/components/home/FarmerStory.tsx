'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { farmerData } from '@/data/farmer';

export default function FarmerStory({ locale }: { locale: Locale }) {
  return (
    <section id="story" className="w-full bg-[var(--color-ivory)] pb-24 md:pb-48">
      <div className="w-full px-4 md:px-12 mx-auto max-w-[1800px]">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[85vh]">
          
          {/* Left: 70% Photograph */}
          <div className="w-full lg:w-[70%] h-[60vh] lg:h-full relative overflow-hidden group">
            <Link href={`/${locale}/our-story`}>
              <Image
                src={farmerData.portrait}
                alt={farmerData.name}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover object-[center_30%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:opacity-0" />
            </Link>
          </div>

          {/* Right: 30% Typography */}
          <div className="w-full lg:w-[30%] h-full flex flex-col justify-end pt-12 lg:pt-0 lg:pl-12 lg:pb-12">
            
            <div className="flex gap-8 items-end mb-16">
              <div className="hidden lg:block w-[1px] h-32 bg-[var(--color-charcoal)]/30" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)] mb-2">
                  The Farmer
                </p>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/60">
                  Behind PRANSH
                </p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)] leading-[1.1] mb-12">
              Before the rice reaches the plate, it lives in the hands of the farmer.
            </h2>
            
            <div className="flex flex-col gap-1 mb-12 text-xs uppercase tracking-widest text-[var(--color-charcoal)]/60 font-medium">
              <span>Location:</span>
              <span>Pavnanagar</span>
              <span>Kale Colony</span>
              <span>410406</span>
            </div>

            <div>
              <Link 
                href={`/${locale}/our-story`}
                className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
              >
                Read the Story
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
