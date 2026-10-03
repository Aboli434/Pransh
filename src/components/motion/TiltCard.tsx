'use client';
import { useRef, MouseEvent } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * maxTilt);
    y.set(yPct * -maxTilt);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : y,
        rotateY: prefersReducedMotion ? 0 : x,
        transformStyle: "preserve-3d"
      }}
      className={`[perspective:1000px] ${className}`}
    >
      <div 
        style={{ transform: prefersReducedMotion ? "translateZ(0px)" : "translateZ(30px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
