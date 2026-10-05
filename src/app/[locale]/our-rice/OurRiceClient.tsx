'use client';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { productsData } from '@/data/products';
import RiceClusterScene from '@/components/three/RiceClusterScene';

export default function OurRiceClient() {
  const product = productsData.find(p => p.id === "indrayani-rice") || productsData[0];

  return (
    <main className="pt-32 pb-32 bg-[var(--color-ivory)] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Header Section */}
        <div className="mb-24 md:mb-32 max-w-3xl">
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif text-[var(--color-charcoal)] leading-[0.9] tracking-tighter mb-4">
            INDRAYANI RICE
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-champagne)] italic mb-12">
            {product.variety}
          </h2>
          
          <div className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/60 mb-4">
            What is Indrayani Rice?
          </div>
          <p className="text-lg md:text-xl text-[var(--color-charcoal)]/80 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Visual Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Main Macro Image */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] relative overflow-hidden">
            <Image 
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Interactive Grain 3D & Close-up */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12 h-full justify-between">
            
            <div className="relative w-full h-[300px] md:h-[400px] bg-[var(--color-charcoal)]/5">
              {/* Floating 3D WebGL Grain Cluster */}
              <RiceClusterScene />
              <div className="absolute bottom-4 left-4 text-xs font-sans uppercase tracking-widest text-[var(--color-charcoal)]/50 pointer-events-none">
                Interactive Grain View
              </div>
            </div>

            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
              <Image 
                src={product.grainImage || product.image}
                alt="Grain Close-up"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
          </div>
          
        </div>

      </div>
    </main>
  );
}
