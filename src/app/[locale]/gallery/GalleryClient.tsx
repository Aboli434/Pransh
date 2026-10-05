'use client';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { images } from '@/data/images';

export default function GalleryClient() {
  return (
    <main className="pt-32 pb-32 bg-[var(--color-ivory)] min-h-screen relative">
      
      <div className="mb-24 text-center max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-6xl md:text-8xl font-serif text-[var(--color-charcoal)] mb-8 tracking-tighter">
          Visual Proof.
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-charcoal)]/60 font-light text-balance leading-relaxed">
          The land, the seasons, the work, and the moments behind PRANSH.
        </p>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {images.gallery.map((src, index) => (
            <div key={index} className="relative w-full break-inside-avoid">
              <Image 
                src={src}
                alt={`Pransh Gallery Image ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
