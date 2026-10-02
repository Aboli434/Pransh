'use client';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface JourneyVisualProps {
  image: string;
  alt: string;
  priority?: boolean;
}

export default function JourneyVisual({ image, alt, priority = false }: JourneyVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden shadow-2xl bg-[var(--color-charcoal)]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={image}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
            priority={priority}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Cinematic overlay gradient to ensure depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/30 to-transparent mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
    </div>
  );
}
