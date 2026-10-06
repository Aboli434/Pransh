'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { images } from '@/data/images';

export default function FarmGallery({ locale }: { locale: Locale }) {
  // Use a selection of images for the homepage teaser
  const teaserImages = [
    images.gallery[0],
    images.gallery[1],
    images.gallery[3], // portrait
    images.gallery[5], // macro
  ];

  return (
    <section id="gallery" className="w-full bg-[var(--color-ivory)] py-24 md:py-48 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
        
        <div className="flex flex-col mb-16">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] font-semibold text-[var(--color-charcoal)]/50 block mb-12">
            FROM PAVNANAGAR
          </span>
        </div>

        {/* Large Editorial Image Composition */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-[65%] grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={teaserImages[0]} alt="Farm Visual 1" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 30vw" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden mt-12 lg:mt-24">
              <Image src={teaserImages[1]} alt="Farm Visual 2" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 30vw" />
            </div>
          </div>
          
          <div className="w-full lg:w-[35%] flex flex-col justify-center pt-12 lg:pt-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-charcoal)] tracking-tighter leading-[1.05] mb-12">
              &ldquo;Where the grain begins.&rdquo;
            </h2>
            
            <Link 
              href="/gallery"
              className="inline-block self-start text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)]/30 pb-1 hover:border-[var(--color-charcoal)] transition-colors"
            >
              VIEW THE VISUAL ARCHIVE &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
