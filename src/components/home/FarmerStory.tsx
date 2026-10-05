'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { farmerData } from '@/data/farmer';

export default function FarmerStory({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      if (Math.abs(x) < 2 && Math.abs(y) < 2) {
        mouseX.set(x);
        mouseY.set(y);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const rotateX = useTransform(mouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);
  const imageX = useTransform(mouseX, [-1, 1], ["-2%", "2%"]);
  const imageY = useTransform(mouseY, [-1, 1], ["-2%", "2%"]);

  return (
    <section id="story" className="w-full bg-[var(--color-ivory)] pb-24 md:pb-48 overflow-hidden">
      <div className="w-full px-4 md:px-12 mx-auto max-w-[1800px]">
        
        {/* Header Question */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)]">
            WHO IS BEHIND PRANSH?
          </span>
        </div>

        <div className="flex flex-col lg:flex-row h-auto lg:h-[75vh]">
          
          {/* LEFT: large real farmer photograph */}
          <div className="w-full lg:w-[60%] h-[60vh] lg:h-full relative [perspective:2000px] flex items-center justify-start p-4 lg:p-0 lg:pr-12">
            <Link href={`/${locale}/our-story`} className="w-full h-full block cursor-none group">
              <motion.div 
                ref={containerRef}
                className="w-full h-full relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(0);
                  mouseY.set(0);
                }}
                style={{ 
                  rotateX: prefersReducedMotion ? 0 : rotateX, 
                  rotateY: prefersReducedMotion ? 0 : rotateY,
                  transformStyle: "preserve-3d"
                }}
                animate={{
                  scale: isHovered && !prefersReducedMotion ? 1.02 : 1,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div 
                  className="absolute inset-0 bg-[var(--color-charcoal)] opacity-20 blur-2xl transform-gpu transition-transform duration-500"
                  style={{ transform: "translateZ(-50px) scale(0.95)" }}
                />
                
                <div className="absolute inset-0 bg-white border border-[var(--color-charcoal)]/10 shadow-xl overflow-hidden pointer-events-none z-10">
                  <motion.div 
                    className="absolute inset-[-5%] w-[110%] h-[110%]"
                    style={{ x: imageX, y: imageY }}
                  >
                    <Image
                      src={farmerData.portrait}
                      alt={farmerData.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-[center_30%]"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay" />
                  
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-charcoal)] text-[var(--color-ivory)] px-6 py-3 rounded-full text-xs uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ transform: "translateZ(100px) translateX(-50%) translateY(-50%)" }}
                  >
                    MEET THE FARMER
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* RIGHT: THE FARMER BEHIND PRANSH */}
          <div className="w-full lg:w-[40%] h-full flex flex-col justify-center pt-12 lg:pt-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-charcoal)] leading-[1.1] mb-12">
              THE FARMER<br/>BEHIND PRANSH
            </h2>
            
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 mb-12 max-w-md">
              Before the rice reaches the plate, it lives in the hands of the farmer. PRANSH represents a direct link to the source.
            </p>

            <div className="flex flex-col gap-2 mb-12 text-sm uppercase tracking-widest text-[var(--color-charcoal)]/80 font-medium">
              <span>PAVNANAGAR</span>
              <span>KALE COLONY</span>
              <span>410406</span>
            </div>

            <div>
              <Link 
                href={`/${locale}/our-story`}
                className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
              >
                MEET THE FARMER
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
