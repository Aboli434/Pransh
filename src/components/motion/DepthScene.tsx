'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface DepthSceneProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function DepthScene({ children, className = "", intensity = 1 }: DepthSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [10 * intensity, -10 * intensity]);
  const rotateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-5 * intensity, 5 * intensity]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [0, 0, 0] : [-100 * intensity, 50 * intensity, -100 * intensity]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full [perspective:1200px] overflow-hidden ${className}`}
    >
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          z,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
