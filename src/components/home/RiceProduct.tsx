'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { productsData } from '@/data/products';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function RiceProduct({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const product = productsData[0]; // Currently showcasing the primary product
  const prefersReducedMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="rice" className="py-24 md:py-32 lg:py-40 bg-[var(--color-charcoal)] relative overflow-hidden">
      
      {/* Decorative large grain graphic / watermark if we wanted, but keeping it clean for now */}

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Text & Info Column */}
          <motion.div 
            className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={textVariants} className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
                {dict.riceProduct.eyebrow}
              </span>
            </motion.div>
            
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-ivory)] mb-8 leading-[1.1]">
              {dict.riceProduct.heading1}<br />
              {dict.riceProduct.heading2}
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-lg md:text-xl text-[var(--color-ivory)]/70 font-light mb-12 max-w-md text-balance">
              {product.description}
            </motion.p>
            
            <motion.div variants={textVariants} className="space-y-6 mb-12">
              {/* Product Metadata */}
              <div className="border-t border-[var(--color-ivory)]/20 pt-6">
                <span className="block text-xs text-[var(--color-champagne)] uppercase tracking-[0.2em] mb-2 font-semibold">
                  {dict.riceProduct.varietyLabel}
                </span>
                <span className="block text-xl font-serif text-[var(--color-ivory)]">
                  {product.variety}
                </span>
              </div>
              
              <div className="border-t border-[var(--color-ivory)]/20 pt-6">
                <span className="block text-xs text-[var(--color-champagne)] uppercase tracking-[0.2em] mb-2 font-semibold">
                  {dict.riceProduct.availabilityLabel}
                </span>
                <span className="block text-xl font-serif text-[var(--color-ivory)]">
                  {product.availability}
                </span>
              </div>
            </motion.div>
            
            <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4">
              <Link href={`/${locale}#contact`}>
                <Button variant="primary" className="w-full sm:w-auto">
                  {dict.riceProduct.enquireCta}
                </Button>
              </Link>
              <Link href={`/${locale}#journey`}>
                <Button variant="text" className="w-full sm:w-auto text-[var(--color-ivory)] hover:text-[var(--color-champagne)]">
                  {dict.riceProduct.journeyCta}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-full flex flex-col gap-6 md:gap-8 relative">
            
            {/* Primary Product Image */}
            <motion.div 
              className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden"
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="w-full h-full group"
                whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>

            {/* Grain Macro Image / Accent */}
            {product.grainImage && (
              <motion.div 
                className="relative self-end w-2/3 sm:w-1/2 aspect-square md:aspect-[4/3] -mt-16 md:-mt-24 z-10 border-8 border-[var(--color-charcoal)] overflow-hidden"
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Image
                  src={product.grainImage}
                  alt="Rice grain texture"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </motion.div>
            )}

          </div>

        </div>
      </Container>
    </section>
  );
}
