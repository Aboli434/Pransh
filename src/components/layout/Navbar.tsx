'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  const navLinks = [
    { id: 'story', num: '01', name: 'OUR STORY', href: `/${locale}/our-story` },
    { id: 'journey', num: '02', name: 'THE JOURNEY', href: `/${locale}/journey` },
    { id: 'rice', num: '03', name: 'OUR RICE', href: `/${locale}/our-rice` },
    { id: 'gallery', num: '04', name: 'GALLERY', href: `/${locale}/gallery` },
    { id: 'contact', num: '05', name: 'CONTACT', href: `/${locale}/contact` },
  ];

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center pointer-events-none mix-blend-difference text-[var(--color-ivory)]">
        
        {/* Left: Logo */}
        <Link href={`/${locale}`} className="pointer-events-auto">
          <span className="font-serif tracking-[0.2em] uppercase text-xl md:text-2xl font-medium">
            PRANSH
          </span>
        </Link>
        
        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-12 pointer-events-auto">
          <nav className="flex items-center gap-8 text-xs font-sans uppercase tracking-[0.2em]">
            {navLinks.slice(0, 4).map((link) => (
              <Link key={link.id} href={link.href} className="hover:text-[var(--color-champagne)] transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-8">
            <LanguageSwitcher currentLocale={locale} />
            <Link 
              href={`/${locale}/contact`}
              className="border border-[var(--color-ivory)] px-6 py-2 text-xs font-sans uppercase tracking-[0.2em] hover:bg-[var(--color-ivory)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              ENQUIRE
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger (Hidden on Desktop) */}
        <button 
          onClick={() => setMenuOpen(true)}
          className="lg:hidden pointer-events-auto group flex items-center justify-center w-12 h-12 rounded-full border border-current transition-transform duration-300 bg-transparent"
        >
          <div className="flex flex-col gap-[4px] w-5">
            <span className="h-[1px] bg-current w-full" />
            <span className="h-[1px] bg-current w-full" />
            <span className="h-[1px] bg-current w-full" />
          </div>
        </button>
        
      </header>

      {/* Full-screen Mobile Navigation Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--color-ivory)] flex flex-col text-[var(--color-forest)] overflow-y-auto"
          >
            {/* Menu Header */}
            <div className="p-6 md:p-12 flex justify-between items-center w-full">
              <span className="font-serif tracking-[0.2em] uppercase text-xl">
                PRANSH
              </span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center"
              >
                <span className="text-3xl font-light">×</span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-6 group"
                    >
                      <span className="text-sm font-sans tracking-widest opacity-50 transition-opacity">
                        {link.num} —
                      </span>
                      <span className="text-4xl md:text-6xl font-serif leading-none tracking-tighter transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Contact Block */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex flex-col gap-4"
              >
                <div className="text-xl font-serif tracking-widest">
                  INDRAYANI RICE
                </div>
                <div className="text-xs font-sans uppercase tracking-[0.2em] opacity-70">
                  10 KG · 25 KG PACKING
                </div>
                <a href="tel:9370943298" className="text-xl font-serif tracking-widest mt-2 hover:opacity-70">
                  9370943298
                </a>
                <Link 
                  href={`/${locale}/contact`}
                  onClick={() => setMenuOpen(false)}
                  className="bg-[var(--color-forest)] text-[var(--color-ivory)] px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-charcoal)] transition-colors inline-block text-center mt-4 w-max"
                >
                  ENQUIRE TO ORDER
                </Link>
              </motion.div>
            </div>

            {/* Menu Footer */}
            <div className="p-6 md:p-12 border-t border-[var(--color-forest)]/10 flex justify-center">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
