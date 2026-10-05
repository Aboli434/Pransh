'use client';
import Image from 'next/image';
import { images } from '@/data/images';

export default function GalleryClient() {
  const galleryItems = [
    { src: images.farmer.farm, caption: 'THE LAND' },
    { src: images.farmer.portrait, caption: 'THE FARMER' },
    { src: images.rice.v05_paddyCrop, caption: 'PADDY' },
    { src: images.rice.v06_harvested, caption: 'HARVEST' },
    { src: images.rice.v07_drying, caption: 'DRYING' },
    { src: images.rice.v08_processing, caption: 'PROCESSING' },
    { src: images.rice.v01_macro, caption: 'THE GRAIN' },
    { src: images.rice.v10_packing, caption: 'PACKING' },
  ];

  return (
    <main className="pt-40 pb-32 bg-[var(--color-ivory)] min-h-screen relative text-[var(--color-charcoal)]">
      
      <div className="mb-24 text-center max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
          GALLERY
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-charcoal)]/60 font-light text-balance leading-relaxed">
          The land, the seasons, the work, and the moments behind PRANSH.
        </p>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-charcoal)]/5 border border-[var(--color-charcoal)]/10">
                <Image 
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="text-[10px] font-sans uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
