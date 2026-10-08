'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface JourneyStageProps {
  index: number;
  number: string;
  title: string;
  description: string;
  onActive: (index: number) => void;
  isMobile?: boolean;
  image?: string;
}

export default function JourneyStage({ index, number, title, description, onActive, isMobile, image }: JourneyStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      onActive(index);
    }
  }, [isInView, index, onActive]);

  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div 
      ref={ref} 
      className={`min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center ${isMobile ? 'py-12' : 'py-24'}`}
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={variants}
      >
        <span className="text-xl md:text-3xl font-serif text-[var(--color-gold)] mb-4 block">
          {number}
        </span>
        <h3 className="text-3xl md:text-5xl font-serif text-[var(--primary)] mb-6 leading-tight">
          {title}
        </h3>
        
        {isMobile && image && (
          <div className="relative w-full aspect-[4/3] my-8 shadow-xl">
            <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
          </div>
        )}

        <p className="text-lg md:text-xl text-[var(--color-charcoal)]/80 font-light max-w-md">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
