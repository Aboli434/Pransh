'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import Container from '@/components/ui/Container';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JourneyPageClient({ dict }: { locale: Locale, dict: any }) {

  return (
    <main className="pt-32 pb-32 bg-[var(--color-charcoal)] min-h-screen text-[var(--color-ivory)]">
      <Container>
        <div className="mb-32 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-[var(--color-ivory)]">
            From Seed to Rice.
          </h1>
          <p className="text-xl text-[var(--color-ivory)]/70 font-light">
            Every harvest begins long before the grain reaches the plate.
          </p>
        </div>
        
        <div className="space-y-40 lg:space-y-64">
          {journeyStagesData.map((stage, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={stage.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Visual */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="[perspective:1000px]">
                    <motion.div 
                      initial={{ opacity: 0, rotateY: isEven ? 10 : -10, translateZ: -50 }}
                      whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative aspect-[4/3] w-full bg-black shadow-2xl overflow-hidden"
                    >
                      <Image 
                        src={stage.image}
                        alt={`Stage ${index + 1}`}
                        fill
                        className="object-cover opacity-90"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-[var(--color-champagne)] font-serif text-6xl md:text-8xl opacity-20 block mb-2 leading-none">
                      0{index + 1}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-ivory)] mb-6">
                      {dict.journey?.stages?.[stage.id]?.title || stage.id}
                    </h2>
                    <p className="text-lg text-[var(--color-ivory)]/70 font-light leading-relaxed max-w-lg">
                      {dict.journey?.stages?.[stage.id]?.desc || "[Description pending]"}
                    </p>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
