'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { brandConfig } from '@/data/brand';
import LanguageSwitcher from './LanguageSwitcher';

const navImages: Record<string, string> = {
  home: "/images/hero/hero-landscape.jpg",
  story: "/images/farmer/portrait-1.jpg",
  journey: "/images/gallery/harvest-1.jpg",
  rice: "/images/rice/rice-product.jpg",
  gallery: "/images/gallery/landscape-2.jpg",
  contact: "/images/gallery/detail-1.jpg"
};

export default function Navbar({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dict = getDictionary(locale);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  const navLinks = [
    { id: 'home', num: '01', name: dict.navigation.home, href: `/${locale}` },
    { id: 'story', num: '02', name: dict.navigation.ourStory, href: `/${locale}/our-story` },
    { id: 'journey', num: '03', name: dict.navigation.theJourney, href: `/${locale}/journey` },
    { id: 'rice', num: '04', name: dict.navigation.ourRice, href: `/${locale}/our-rice` },
    { id: 'gallery', num: '05', name: dict.navigation.gallery, href: `/${locale}/gallery` },
    { id: 'contact', num: '06', name: dict.navigation.contact, href: `/${locale}/contact` },
  ];

  return (
    <>
      {/* Minimal Editorial Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-start pointer-events-none mix-blend-difference text-[var(--color-ivory)]">
        
        <Link href={`/${locale}`} className="pointer-events-auto">
          <span className="font-serif tracking-[0.2em] uppercase text-xl md:text-2xl font-medium">
            {brandConfig.name}
          </span>
        </Link>
        
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-12 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-80">
            01 — Home ◉
          </span>
        </div>
        
        <button 
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto group flex items-center justify-center w-12 h-12 rounded-full border border-current transition-transform duration-500 hover:scale-110"
        >
          <div className="flex flex-col gap-1 w-4">
            <span className="h-px bg-current w-full transition-transform group-hover:-translate-y-1" />
            <span className="h-px bg-current w-full" />
            <span className="h-px bg-current w-full transition-transform group-hover:translate-y-1" />
          </div>
        </button>
        
      </header>

      {/* Full-screen Navigation Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0)" }}
            animate={{ clipPath: "circle(150% at 100% 0)" }}
            exit={{ clipPath: "circle(0% at 100% 0)", transition: { delay: 0.4, duration: 0.8 } }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--color-ivory)] flex flex-col"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                {hoveredItem && (
                  <motion.div
                    key={hoveredItem}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={navImages[hoveredItem]}
                      alt="Navigation Preview"
                      fill
                      className="object-cover opacity-30 mix-blend-multiply"
                      sizes="100vw"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ivory)] via-transparent to-[var(--color-ivory)] pointer-events-none" />
            </div>

            {/* Menu Header */}
            <div className="relative z-10 p-6 md:p-12 flex justify-between items-center w-full">
              <span className="font-serif tracking-[0.2em] uppercase text-xl text-[var(--color-charcoal)]">
                {brandConfig.name}
              </span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="group w-12 h-12 rounded-full border border-[var(--color-charcoal)] text-[var(--color-charcoal)] flex items-center justify-center transition-transform duration-500 hover:rotate-90 hover:scale-110"
              >
                <span className="text-xl font-light">✕</span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24">
              <nav className="flex flex-col gap-2 md:gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    onMouseEnter={() => setHoveredItem(link.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-6 md:gap-12 text-[var(--color-charcoal)] group"
                    >
                      <span className="text-sm md:text-base font-semibold tracking-widest text-[var(--color-charcoal)]/40 transition-colors group-hover:text-[var(--color-terracotta)]">
                        {link.num}
                      </span>
                      <span className="text-5xl md:text-7xl lg:text-[100px] font-serif leading-none tracking-tighter transition-colors duration-500 group-hover:text-[var(--color-terracotta)]">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="relative z-10 p-6 md:p-12 flex justify-between items-end border-t border-[var(--color-charcoal)]/10"
            >
              <LanguageSwitcher currentLocale={locale} />
              <div className="flex gap-8 text-xs tracking-widest uppercase text-[var(--color-charcoal)]/60 font-medium">
                <a href={`mailto:${brandConfig.contact.email}`} className="hover:text-[var(--color-charcoal)] transition-colors">Email</a>
                <a href={`tel:${brandConfig.contact.phone}`} className="hover:text-[var(--color-charcoal)] transition-colors">Call</a>
              </div>
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
