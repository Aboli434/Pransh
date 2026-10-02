'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { journeyStagesData } from '@/data/journey';
import Container from '../ui/Container';
import Button from '../ui/Button';
import JourneyStage from '../journey/JourneyStage';
import JourneyVisual from '../journey/JourneyVisual';
import JourneyProgress from '../journey/JourneyProgress';

export default function RiceJourney({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [activeIndex, setActiveIndex] = useState(0);

  // Map the hardcoded data array to the translation dictionary
  const stagesKeys = ['seed', 'sowing', 'growing', 'harvesting', 'drying', 'processing', 'cleaning', 'rice'] as const;
  
  const stages = journeyStagesData.map((stage, idx) => {
    const key = stagesKeys[idx];
    return {
      ...stage,
      title: dict.journey.stages[key].title,
      description: dict.journey.stages[key].desc
    };
  });

  return (
    <section id="journey" className="py-24 md:py-32 bg-[var(--color-ivory)] relative">
      <Container>
        
        {/* Section Intro */}
        <div className="mb-20 md:mb-32 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[var(--color-champagne)]"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sage)]">
              {dict.journey.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--primary)] mb-6 leading-[1.1]"
          >
            {dict.journey.heading}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--color-charcoal)]/80 font-light"
          >
            {dict.journey.description}
          </motion.p>
        </div>

        {/* Desktop Sticky Layout */}
        <div className="hidden md:grid grid-cols-12 gap-12 relative items-start">
          
          {/* Left Content Column (Scrolls) */}
          <div className="col-span-5 relative z-10 pb-32">
            {stages.map((stage, idx) => (
              <JourneyStage 
                key={stage.id}
                index={idx}
                number={stage.number}
                title={stage.title}
                description={stage.description}
                onActive={setActiveIndex}
              />
            ))}
          </div>

          {/* Right Visual Column (Sticky) */}
          <div className="col-span-7 sticky top-32 h-[calc(100vh-8rem)] flex flex-col justify-center">
            
            <div className="mb-8">
              <JourneyProgress total={stages.length} activeIndex={activeIndex} />
            </div>
            
            <JourneyVisual 
              image={stages[activeIndex].image} 
              alt={stages[activeIndex].title}
              priority={activeIndex === 0}
            />
            
            {/* End of Journey CTA overlay or bottom text */}
            <motion.div 
              className="mt-8 flex items-center justify-between"
              animate={{ opacity: activeIndex === stages.length - 1 ? 1 : 0 }}
            >
              <span className="text-sm tracking-widest uppercase text-[var(--color-sage)]">
                {dict.journey.continueText}
              </span>
              <Link href={`/${locale}#rice`}>
                <Button variant="outline">{dict.journey.exploreCta}</Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="md:hidden space-y-16">
          <div className="sticky top-20 z-50 bg-[var(--color-ivory)]/90 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-[var(--color-charcoal)]/10">
             <JourneyProgress total={stages.length} activeIndex={activeIndex} />
          </div>
          
          {stages.map((stage, idx) => (
            <JourneyStage 
              key={stage.id}
              index={idx}
              number={stage.number}
              title={stage.title}
              description={stage.description}
              image={stage.image}
              isMobile={true}
              onActive={setActiveIndex}
            />
          ))}
          
          <div className="pt-12 flex flex-col items-center gap-6 text-center border-t border-[var(--color-charcoal)]/10">
            <span className="text-sm tracking-widest uppercase text-[var(--color-sage)]">
              {dict.journey.continueText}
            </span>
            <Link href={`/${locale}#rice`}>
              <Button variant="primary">{dict.journey.exploreCta}</Button>
            </Link>
          </div>
        </div>

      </Container>
    </section>
  );
}
