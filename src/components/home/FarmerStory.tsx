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

  // Mouse position tracking
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized mouse position relative to the image container
      // -1 (left/top) to +1 (right/bottom)
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // Only update if mouse is relatively close to or inside the container
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

  // Transform mouse position into 3D rotation
  const rotateX = useTransform(mouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);
  
  // Parallax for inner image
  const imageX = useTransform(mouseX, [-1, 1], ["-2%", "2%"]);
  const imageY = useTransform(mouseY, [-1, 1], ["-2%", "2%"]);

  return (
    <section id="story" className="w-full bg-[var(--color-ivory)] pb-24 md:pb-48 overflow-hidden">
      <div className="w-full px-4 md:px-12 mx-auto max-w-[1800px]">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[85vh]">
          
          {/* Left: 70% Photograph in Physical 3D Frame */}
          <div className="w-full lg:w-[70%] h-[60vh] lg:h-full relative [perspective:2000px] flex items-center justify-center p-4 lg:p-12">
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
                {/* Secondary Depth Layer (Shadow/Backing) */}
                <div 
                  className="absolute inset-0 bg-[var(--color-charcoal)] opacity-20 blur-2xl transform-gpu transition-transform duration-500"
                  style={{ transform: "translateZ(-50px) scale(0.95)" }}
                />
                
                {/* Physical Frame */}
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
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover object-[center_30%]"
                    />
                  </motion.div>
                  
                  {/* Subtle Lighting Reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay" />
                  
                  {/* View Details Float */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-charcoal)] text-[var(--color-ivory)] px-6 py-3 rounded-full text-xs uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ transform: "translateZ(100px) translateX(-50%) translateY(-50%)" }}
                  >
                    View Story
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Right: 30% Typography */}
          <div className="w-full lg:w-[30%] h-full flex flex-col justify-end pt-12 lg:pt-0 lg:pl-12 lg:pb-12">
            
            <div className="flex gap-8 items-end mb-16">
              <div className="hidden lg:block w-[1px] h-32 bg-[var(--color-charcoal)]/30" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-champagne)] mb-2">
                  The Farmer
                </p>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/60">
                  Behind PRANSH
                </p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)] leading-[1.1] mb-12">
              Before the rice reaches the plate, it lives in the hands of the farmer.
            </h2>
            
            <div className="flex flex-col gap-1 mb-12 text-xs uppercase tracking-widest text-[var(--color-charcoal)]/60 font-medium">
              <span>Location:</span>
              <span>Pavnanagar</span>
              <span>Kale Colony</span>
              <span>410406</span>
            </div>

            <div>
              <Link 
                href={`/${locale}/our-story`}
                className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)] pb-1 hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)] transition-colors"
              >
                Read the Story
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
