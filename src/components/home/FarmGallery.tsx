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
        
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--color-charcoal)] tracking-tight mb-8">
            From Pavnanagar.
          </h2>
          <Link 
            href="/gallery"
            className="group inline-flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors">
              VIEW THE GALLERY
            </span>
          </Link>
        </div>

        {/* Straightforward Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {teaserImages.map((src, idx) => (
            <div 
              key={idx} 
              className={`relative w-full overflow-hidden ${
                idx === 0 || idx === 3 ? 'aspect-square' : 'aspect-[3/4]'
              }`}
            >
              <Image
                src={src}
                alt="Farm Visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
