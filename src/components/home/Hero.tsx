'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { homeData } from '@/data/home';
import Container from '../ui/Container';
import Button from '../ui/Button';
import DepthScene from '../motion/DepthScene';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "10%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-10%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-charcoal)]">
      
      <DepthScene intensity={0.5} className="absolute inset-0 w-full h-full">
        {/* Layer 1: Background Sky/Farm (Placeholder using original image with zoom) */}
        <motion.div 
          style={{ y: bgY, translateZ: "-50px" }}
          className="absolute inset-[-5%] w-[110%] h-[110%] origin-top"
        >
          <Image
            src={homeData.hero.backgroundImage}
            alt="PRANSH Farm Landscape"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="100vw"
          />
        </motion.div>

        {/* Layer 2 & 3 would go here when client provides multi-layered assets. 
            For now, we use gradients and CSS overlays to simulate the depth planes */}
        <motion.div 
          style={{ y: midY, translateZ: "0px" }}
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-[var(--color-charcoal)]/30 opacity-90" 
        />
        
        <motion.div 
          style={{ y: fgY, translateZ: "50px" }}
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/90 via-black/20 to-transparent md:w-2/3" 
        />
      </DepthScene>

      <Container className="relative h-full flex flex-col justify-end pb-24 md:pb-32 z-10 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pointer-events-auto">
          
          {/* Main Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)] drop-shadow-md">
                {dict.hero.eyebrow}
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-[44px] sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] leading-[1.1] md:leading-[1.05] font-serif text-[var(--color-ivory)] mb-6 drop-shadow-lg"
            >
              {dict.hero.heading1} <br />
              {dict.hero.heading2}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-ivory)]/90 max-w-xl mb-10 font-light drop-shadow-md text-balance"
            >
              {dict.hero.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`/${locale}/our-rice`}>
                <Button variant="primary" className="w-full sm:w-auto shadow-lg">{dict.hero.discoverCta}</Button>
              </Link>
              <Link href={`/${locale}/our-story`}>
                <Button variant="text" className="w-full sm:w-auto text-[var(--color-ivory)] hover:text-[var(--color-champagne)] drop-shadow-md">
                  {dict.hero.ourStoryCta}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Floating Editorial Card Teaser */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            className="hidden lg:block w-64 bg-[var(--color-ivory)]/5 backdrop-blur-md border border-[var(--color-ivory)]/10 p-6 shadow-2xl mb-8"
          >
            <p className="text-[var(--color-champagne)] text-xs uppercase tracking-widest mb-3">Featured</p>
            <h3 className="text-[var(--color-ivory)] font-serif text-xl mb-2">Indrayani Rice</h3>
            <p className="text-[var(--color-ivory)]/70 text-sm font-light leading-relaxed mb-4">
              A premium harvest known for its distinctive character and soft texture.
            </p>
            <Link href={`/${locale}/our-rice`} className="text-[var(--color-ivory)] hover:text-[var(--color-champagne)] text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
              Explore <span>→</span>
            </Link>
          </motion.div>

        </div>
      </Container>
      
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/70">
          {dict.hero.scrollIndicator}
        </span>
        <div className="h-12 w-[1px] bg-[var(--color-ivory)]/30 overflow-hidden relative">
          {!prefersReducedMotion && (
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-[var(--color-champagne)]"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}
