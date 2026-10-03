'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { galleryData } from '@/data/gallery';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function FarmGallery({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "15%"]);

  const teaserImages = galleryData.slice(0, 3);

  return (
    <section id="gallery" ref={containerRef} className="py-24 md:py-32 lg:py-40 bg-[var(--color-ivory)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
                {dict.farmGallery.eyebrow}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--primary)] mb-8 leading-[1.1]">
              A Glimpse of the Farm.
            </h2>
            
            <p className="text-lg text-[var(--color-charcoal)]/80 font-light mb-10 max-w-lg text-balance">
              Explore the fields, the seasons, the work, and the moments behind the harvest. See the real world where PRANSH is grown.
            </p>
            
            <Link href={`/${locale}/gallery`}>
              <Button variant="outline">View the Full Gallery</Button>
            </Link>
          </div>

          {/* Overlapping Images Composition */}
          <div className="order-1 lg:order-2 relative h-[500px] sm:h-[600px] w-full max-w-xl mx-auto lg:mx-0">
            {teaserImages[0] && (
              <motion.div 
                style={{ y: y1 }}
                className="absolute top-0 right-0 w-[65%] h-[60%] z-10 shadow-2xl"
              >
                <Image
                  src={teaserImages[0].src}
                  alt={teaserImages[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </motion.div>
            )}
            
            {teaserImages[1] && (
              <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-[10%] left-0 w-[55%] h-[55%] z-20 shadow-2xl border-8 border-[var(--color-ivory)]"
              >
                <Image
                  src={teaserImages[1].src}
                  alt={teaserImages[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </motion.div>
            )}
            
            {teaserImages[2] && (
              <motion.div 
                className="absolute bottom-0 right-[10%] w-[35%] h-[35%] z-30 shadow-xl border-4 border-[var(--color-ivory)] hidden sm:block"
              >
                <Image
                  src={teaserImages[2].src}
                  alt={teaserImages[2].alt}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </motion.div>
            )}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
