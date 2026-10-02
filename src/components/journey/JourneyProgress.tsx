'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function JourneyProgress({ total, activeIndex }: { total: number, activeIndex: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-4 hide-scrollbar w-full">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === activeIndex;
        const isPast = idx < activeIndex;
        const num = (idx + 1).toString().padStart(2, '0');
        
        return (
          <div key={idx} className="flex items-center gap-2 md:gap-4 shrink-0">
            <motion.div
              animate={{
                color: isActive || isPast ? 'var(--primary)' : 'rgba(25, 53, 42, 0.4)',
                scale: isActive && !prefersReducedMotion ? 1.1 : 1
              }}
              className="text-sm md:text-base font-serif font-semibold transition-colors duration-500"
            >
              {num}
            </motion.div>
            
            {idx < total - 1 && (
              <div className="w-8 md:w-16 h-[1px] bg-[var(--primary)]/20 relative">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-[var(--primary)]"
                  initial={{ width: "0%" }}
                  animate={{ width: isPast ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
