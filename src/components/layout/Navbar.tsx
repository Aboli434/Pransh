'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { images } from '@/data/images';
import LanguageSwitcher from './LanguageSwitcher';

const navImages: Record<string, string> = {
  home: images.hero,
  story: images.farmer.portrait,
  journey: images.journey.harvesting,
  rice: images.rice.macro,
  gallery: images.gallery[0],
  contact: images.gallery[2]
};

export default function Navbar({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  const navLinks = [
    { id: 'home', num: '01', name: 'HOME', href: `/${locale}` },
    { id: 'story', num: '02', name: 'OUR STORY', href: `/${locale}/our-story` },
    { id: 'journey', num: '03', name: 'THE JOURNEY', href: `/${locale}/journey` },
    { id: 'rice', num: '04', name: 'OUR RICE', href: `/${locale}/our-rice` },
    { id: 'gallery', num: '05', name: 'GALLERY', href: `/${locale}/gallery` },
    { id: 'contact', num: '06', name: 'CONTACT', href: `/${locale}/contact` },
  ];

  return (
    <>
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-start pointer-events-none mix-blend-difference text-[var(--color-ivory)]">
        
        <Link href={`/${locale}`} className="pointer-events-auto">
          <span className="font-serif tracking-[0.2em] uppercase text-xl md:text-2xl font-medium">
            PRANSH
          </span>
        </Link>
        
        <button 
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto group flex items-center justify-center w-12 h-12 rounded-full border border-current transition-transform duration-300 hover:scale-105 bg-transparent"
        >
          <div className="flex flex-col gap-[3px] w-5">
            <span className="h-[1px] bg-current w-full" />
            <span className="h-[1px] bg-current w-full" />
            <span className="h-[1px] bg-current w-full" />
          </div>
        </button>
        
      </header>

      {/* Full-screen Navigation Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-[var(--color-charcoal)] flex flex-col"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-20">
              <Image 
                src={hoveredItem ? navImages[hoveredItem] : navImages.home}
                alt="Navigation Preview"
                fill
                className="object-cover transition-opacity duration-500"
                sizes="100vw"
                priority
              />
            </div>

            {/* Menu Header */}
            <div className="relative z-10 p-6 md:p-12 flex justify-between items-center w-full">
              <span className="font-serif tracking-[0.2em] uppercase text-xl text-[var(--color-ivory)]">
                PRANSH
              </span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-[var(--color-ivory)] text-[var(--color-ivory)] flex items-center justify-center transition-transform hover:scale-105"
              >
                <span className="text-xl font-light">✕</span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24">
              <nav className="flex flex-col gap-4 md:gap-6">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    onMouseEnter={() => setHoveredItem(link.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-6 md:gap-12 text-[var(--color-ivory)] group"
                    >
                      <span className="text-sm md:text-base font-sans tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                        {link.num}
                      </span>
                      <span className="text-4xl md:text-6xl lg:text-[80px] font-serif leading-none tracking-tighter transition-colors group-hover:text-[var(--color-champagne)]">
                        {link.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="relative z-10 p-6 md:p-12 flex justify-between items-end border-t border-[var(--color-ivory)]/10 text-[var(--color-ivory)]">
              <LanguageSwitcher currentLocale={locale} />
              <div className="flex gap-8 text-xs tracking-widest uppercase opacity-80 font-medium">
                <a href="mailto:unmeshrisbud345@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors">EMAIL</a>
                <a href="tel:9370943298" className="hover:text-[var(--color-champagne)] transition-colors">CALL</a>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
