'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function DirectFromFarm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
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
    <section id="direct" className="py-24 md:py-32 lg:py-40 bg-[var(--color-beige)] relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Visual Column - 5 columns wide with 1 col offset */}
          <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 relative">
            <motion.div 
              className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="w-full h-full group"
                initial={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/farmer/farmer-field.jpg"
                  alt="Farm field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Text Column - 4 columns wide */}
          <motion.div 
            className="lg:col-span-4 lg:col-start-8 order-1 lg:order-2 flex flex-col justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={textVariants} className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
                {dict.directFromFarm.eyebrow}
              </span>
            </motion.div>
            
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-serif text-[var(--primary)] mb-8 leading-[1.1]">
              {dict.directFromFarm.heading}
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-lg text-[var(--color-charcoal)]/80 font-light mb-12">
              {dict.directFromFarm.description}
            </motion.p>
            
            <div className="space-y-8 mb-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--color-champagne)]/30">
              {dict.directFromFarm.principles.map((principle) => (
                <motion.div key={principle.id} variants={textVariants} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-[var(--color-beige)] border border-[var(--color-champagne)] flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-champagne)]"></div>
                  </div>
                  <h3 className="text-lg font-serif text-[var(--primary)] font-semibold mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[var(--color-charcoal)]/70 leading-relaxed font-light">
                    {principle.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4 items-start pt-4">
              <Link href={`/${locale}#contact`}>
                <Button variant="primary" className="w-full sm:w-auto">
                  {dict.directFromFarm.primaryCta}
                </Button>
              </Link>
              <Link href={`/${locale}#story`}>
                <Button variant="outline" className="w-full sm:w-auto">
                  {dict.directFromFarm.secondaryCta}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
