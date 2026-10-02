'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { galleryData } from '@/data/gallery';
import Container from '../ui/Container';

export default function FarmGallery({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const prefersReducedMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  const getAspectClass = (aspect: string | undefined, isFeatured: boolean | undefined) => {
    if (isFeatured) return 'aspect-[3/2] md:aspect-[21/9]';
    switch (aspect) {
      case 'portrait': return 'aspect-[3/4]';
      case 'square': return 'aspect-square';
      case 'landscape': return 'aspect-[3/2]';
      case 'wide': return 'aspect-[2/1]';
      default: return 'aspect-[4/3]';
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 lg:py-40 bg-[var(--color-ivory)] relative overflow-hidden">
      <Container>
        
        {/* Intro */}
        <div className="mb-20 md:mb-32 max-w-2xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
              {dict.farmGallery.eyebrow}
            </span>
            <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--primary)] mb-6 leading-[1.1]"
          >
            {dict.farmGallery.heading}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--color-charcoal)]/80 font-light text-balance"
          >
            {dict.farmGallery.description}
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-max"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {galleryData.map((item, index) => {
            // Determine column span for desktop
            let colSpanClass = 'col-span-1 md:col-span-6';
            if (item.featured) {
              colSpanClass = 'col-span-1 md:col-span-12';
            } else if (index === 1 || index === 4) {
              colSpanClass = 'col-span-1 md:col-span-4'; // Make some items narrower
            } else if (index === 2 || index === 3) {
              colSpanClass = 'col-span-1 md:col-span-8'; // Make some items wider
            } else if (index === 5) {
              colSpanClass = 'col-span-1 md:col-span-12';
            }

            return (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className={`relative group overflow-hidden ${colSpanClass}`}
              >
                <div className={`relative w-full overflow-hidden ${getAspectClass(item.aspect, item.featured)}`}>
                  <motion.div
                    className="w-full h-full"
                    whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={item.featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-cover object-center"
                    />
                  </motion.div>
                </div>
                
                {/* Optional Caption */}
                {item.captionKey && (
                  <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-ivory)] bg-[var(--color-charcoal)]/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                      {dict.farmGallery.captions[item.captionKey as keyof typeof dict.farmGallery.captions]}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-24 md:mt-32 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="block text-sm text-[var(--color-sage)] italic font-serif mb-4">Want to know more?</span>
            <Link 
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 text-xl md:text-2xl font-serif text-[var(--primary)] hover:text-[var(--color-champagne)] transition-colors duration-300 group"
            >
              {dict.farmGallery.cta}
              <span className="block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
