'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { farmerData } from '@/data/farmer';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function FarmerStory({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", prefersReducedMotion ? "0%" : "10%"]);
  
  const textVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: 0.2 }
    }
  };

  return (
    <section id="story" ref={containerRef} className="py-24 md:py-32 lg:py-40 bg-[var(--color-ivory)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-5 order-2 lg:order-1 pt-8 lg:pt-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={textVariants} className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
                {dict.farmer.eyebrow}
              </span>
            </motion.div>
            
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--primary)] mb-8 leading-[1.1]">
              {dict.farmer.heading}
            </motion.h2>
            
            <motion.div variants={textVariants} className="prose prose-lg text-[var(--color-charcoal)]/80 font-light mb-10 max-w-none">
              <p>{dict.farmer.storyPlaceholder}</p>
            </motion.div>

            <motion.div variants={textVariants} className="flex items-center gap-2 mb-12 text-[var(--color-sage)] text-sm tracking-widest uppercase">
              <MapPin size={16} />
              <span>{farmerData.location}</span>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <Link href={`/${locale}/our-story`}>
                <Button variant="outline">Meet the Farmer</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-auto">
            <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] max-w-2xl mx-auto lg:ml-auto">
              
              {/* Main Portrait */}
              <motion.div 
                className="absolute right-0 top-0 w-full md:w-[80%] lg:w-[85%] h-full z-10"
                initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <Image
                  src={farmerData.portrait}
                  alt={farmerData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center shadow-2xl"
                />
              </motion.div>

              {/* Secondary Field Image (Parallax) */}
              <motion.div 
                style={{ y: imgY }}
                className="hidden md:block absolute left-0 bottom-12 w-[45%] aspect-[4/3] z-20 shadow-xl border-4 border-[var(--color-ivory)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <Image
                  src={farmerData.farmImage}
                  alt="Farm details"
                  fill
                  sizes="(max-width: 1024px) 25vw, 30vw"
                  className="object-cover object-center"
                />
              </motion.div>
              
              {/* Decorative Accent */}
              <div className="hidden md:block absolute right-[-20px] top-[10%] w-[100px] h-[100px] border border-[var(--color-champagne)] z-0" />
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
