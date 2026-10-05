'use client';
import Image from 'next/image';
import Link from 'next/link';
import { productsData } from '@/data/products';
import { images } from '@/data/images';
import RiceClusterScene from '@/components/three/RiceClusterScene';

export default function OurRiceClient() {
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <main className="pt-32 pb-32 bg-[var(--color-ivory)] min-h-screen text-[var(--color-charcoal)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT: Large rice macro photograph */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-[85vh] relative overflow-hidden">
            <Image 
              src={images.rice.v01_macro}
              alt="Raw Indrayani rice grains macro"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* RIGHT: Product Information */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="text-xs uppercase tracking-[0.4em] font-semibold text-[var(--color-champagne)] mb-6">
              OUR RICE / WHAT IS IT?
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-serif leading-[0.9] tracking-tighter mb-4">
              INDRAYANI RICE
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-charcoal)]/60 italic mb-10">
              इंद्रायणी तांदूळ
            </h2>
            
            <p className="text-lg md:text-xl text-[var(--color-charcoal)]/80 font-light leading-relaxed max-w-xl mb-16">
              {product.description}
            </p>

            <div className="mb-16">
              <div className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/50 mb-6">
                AVAILABLE PACKING
              </div>
              <div className="flex gap-4">
                <div className="border border-[var(--color-charcoal)]/20 px-8 py-4 text-xl font-serif tracking-widest text-[var(--color-charcoal)]">
                  10 KG
                </div>
                <div className="border border-[var(--color-charcoal)]/20 px-8 py-4 text-xl font-serif tracking-widest text-[var(--color-charcoal)]">
                  25 KG
                </div>
              </div>
            </div>

            <div className="mb-16">
              <div className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/50 mb-6">
                ORDER
              </div>
              <p className="text-base text-[var(--color-charcoal)]/70 mb-6">
                Interested in Indrayani Rice? Enquire for availability and ordering details.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <a 
                  href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-forest)] text-[var(--color-ivory)] px-10 py-5 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-charcoal)] transition-colors inline-block"
                >
                  ENQUIRE TO ORDER →
                </a>
                <div className="flex flex-col gap-1 text-sm tracking-widest opacity-80">
                  <a href="tel:9370943298" className="hover:text-[var(--color-champagne)] transition-colors">9370943298</a>
                  <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors">unmeshrisbud345@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Secondary close-up image & 3D Interactive subtle hint */}
            <div className="flex flex-col sm:flex-row gap-6 h-[250px] mt-auto">
              <div className="relative w-full sm:w-1/2 h-full overflow-hidden">
                <Image 
                  src={images.rice.v03_cleanCloseUp}
                  alt="Clean rice grains close-up"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="relative w-full sm:w-1/2 h-full bg-[var(--color-charcoal)]/5 flex flex-col items-center justify-center">
                <div className="absolute inset-0">
                  <RiceClusterScene />
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-[var(--color-charcoal)]/40 pointer-events-none font-semibold">
                  INTERACTIVE GRAIN
                </div>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </main>
  );
}
