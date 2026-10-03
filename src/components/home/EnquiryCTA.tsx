'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function EnquiryCTA({ locale }: { locale: Locale }) {
  const prefersReducedMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="contact" className="relative min-h-[60vh] flex items-center justify-center py-32 overflow-hidden bg-[var(--color-charcoal)]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full origin-center"
          initial={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/gallery/landscape-2.jpg"
            alt="Farm landscape background"
            fill
            sizes="100vw"
            className="object-cover opacity-40 object-[center_70%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-[var(--color-charcoal)] opacity-80" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[var(--color-champagne)]"></span>
              <span className="text-sm uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
                START A CONVERSATION
              </span>
              <span className="h-px w-12 bg-[var(--color-champagne)]"></span>
            </motion.div>
            
            {/* Heading */}
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-serif text-[var(--color-ivory)] mb-8 leading-tight">
              Interested in Indrayani Rice?
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" className="shadow-2xl">Start an Enquiry</Button>
              </Link>
            </motion.div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
