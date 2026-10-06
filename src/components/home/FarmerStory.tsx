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
        
        <div className="flex flex-col lg:flex-row h-auto lg:min-h-[80vh] items-stretch border-t border-[var(--color-charcoal)]/10 pt-16">
          
          {/* LEFT: large real farmer photograph */}
          <div className="w-full lg:w-1/2 relative min-h-[60vh] lg:min-h-[80vh] overflow-hidden group">
            <Link href="/our-story" className="w-full h-full block cursor-none">
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
                  scale: isHovered && !prefersReducedMotion ? 1.03 : 1,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute inset-[-5%] w-[110%] h-[110%]"
                  style={{ x: imageX, y: imageY }}
                >
                  <Image
                    src={farmerData.portrait}
                    alt={farmerData.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[center_30%]"
                  />
                </motion.div>
                
                {/* Subtle overlay for text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent mix-blend-multiply opacity-50" />
                
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-ivory)] text-[var(--color-charcoal)] px-8 py-4 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl"
                  style={{ transform: "translateZ(50px) translateX(-50%) translateY(-50%)" }}
                >
                  MEET THE FARMER
                </motion.div>
              </motion.div>
            </Link>
          </div>

          {/* RIGHT: THE FARMER BEHIND PRANSH */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between py-12 lg:py-8 lg:pl-24">
            <div>
              <div className="flex flex-col gap-2 mb-16">
                <span className="text-sm font-serif italic text-[var(--color-charcoal)]/60">01</span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-semibold text-[var(--color-charcoal)]/60">
                  WHO IS BEHIND PRANSH?
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--color-charcoal)] leading-[1.0] tracking-tighter mb-12">
                &ldquo;From a field in Maval,<br/>
                to a grain on your table.&rdquo;
              </h2>
              
              <p className="text-base md:text-lg font-sans font-light leading-relaxed text-[var(--color-charcoal)]/80 max-w-sm mb-16">
                Before the rice reaches the plate, it lives in the hands of the farmer. PRANSH represents a direct link to the source, bringing you pure Indrayani rice from local fields.
              </p>
            </div>

            <div className="pt-12 border-t border-[var(--color-charcoal)]/10 flex flex-col items-start gap-8">
              <div className="flex flex-col gap-1 text-[10px] font-sans uppercase tracking-[0.4em] text-[var(--color-charcoal)]/70 font-medium">
                <span>PAVNANAGAR · MAVAL</span>
              </div>

              <Link 
                href="/our-story"
                className="inline-block text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)]/30 pb-1 hover:border-[var(--color-charcoal)] transition-colors"
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
