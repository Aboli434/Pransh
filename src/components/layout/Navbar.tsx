'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';

export default function Navbar({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'story', num: '01', name: 'OUR STORY', href: `/our-story` },
    { id: 'journey', num: '02', name: 'JOURNEY', href: `/journey` },
    { id: 'rice', num: '03', name: 'OUR RICE', href: `/our-rice` },
    { id: 'gallery', num: '04', name: 'GALLERY', href: `/gallery` },
    { id: 'contact', num: '05', name: 'CONTACT', href: `/contact` },
  ];

  // Colors based on scroll state
  const navBg = isScrolled ? 'rgba(243, 235, 221, 0.94)' : 'transparent';
  const navColor = isScrolled ? 'var(--color-charcoal)' : 'var(--color-parchment)';
  const navBorder = isScrolled ? 'rgba(37,37,31,0.12)' : 'transparent';
  const navHeight = isScrolled ? '72px' : '96px';
  const mobileNavHeight = isScrolled ? '72px' : '82px';

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: navBg,
          color: navColor,
          borderColor: navBorder,
          height: navHeight
        }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 w-full z-50 border-b hidden lg:flex items-center justify-between px-12`}
        style={{ backdropFilter: isScrolled ? 'blur(8px)' : 'none' }}
      >
        {/* DESKTOP LEFT: BRAND */}
        <Link href="/" className="flex flex-col justify-center items-start group">
          <span className="font-serif uppercase text-3xl tracking-[0.08em] leading-none mb-1">
            PRANSH
          </span>
          <span className="font-sans uppercase text-[8px] tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
            PAVNANAGAR · MAVAL
          </span>
        </Link>

        {/* DESKTOP CENTER: NAV */}
        <nav className="flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.id} 
                href={link.href} 
                className="relative group py-2 flex flex-col items-center"
              >
                <span className={`font-sans uppercase text-[11px] tracking-[0.2em] transition-colors ${isActive ? 'opacity-100 font-semibold' : 'opacity-70 group-hover:opacity-100'}`}>
                  {link.name}
                </span>
                
                {/* Active Indicator Line */}
                <motion.div
                  initial={false}
                  animate={{
                    width: isActive ? '100%' : '0%',
                    opacity: isActive ? 1 : 0
                  }}
                  className="absolute bottom-0 h-px bg-[var(--color-terracotta)]"
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
                
                {/* Hover Indicator Line (only visible when not active) */}
                {!isActive && (
                  <div className="absolute bottom-0 h-px w-0 bg-[var(--color-terracotta)]/50 group-hover:w-full transition-all duration-300 ease-out" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP RIGHT: ORDER */}
        <div className="flex justify-end min-w-[150px]">
          <a
            href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20order%20PRANSH%20Indrayani%20Rice."
            target="_blank"
            rel="noopener noreferrer"
            className={`border px-8 py-3 text-[11px] font-sans uppercase tracking-[0.25em] font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-parchment)]' 
                : 'border-[var(--color-parchment)] text-[var(--color-parchment)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-charcoal)]'
            }`}
            style={{ borderRadius: '2px' }}
          >
            ORDER
          </a>
        </div>
      </motion.header>

      {/* MOBILE HEADER */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: navBg,
          color: navColor,
          borderColor: navBorder,
          height: mobileNavHeight
        }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 w-full z-50 border-b lg:hidden flex items-center justify-between px-6`}
        style={{ backdropFilter: isScrolled ? 'blur(8px)' : 'none' }}
      >
        <Link href="/" className="font-serif uppercase text-2xl tracking-[0.08em] leading-none relative z-[61]">
          PRANSH
        </Link>
        
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="relative z-50 group flex flex-col items-end gap-1"
        >
          <span className="font-sans uppercase text-[10px] tracking-[0.25em] font-medium mb-1">
            MENU
          </span>
          <span className="h-px bg-current w-8 group-hover:w-10 transition-all duration-300" />
          <span className="h-px bg-current w-6 group-hover:w-10 transition-all duration-300" />
        </button>
      </motion.header>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--color-charcoal)] text-[var(--color-parchment)] flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar for Menu */}
            <div className="flex justify-between items-start px-6 pt-6 h-[82px]">
              <div className="flex flex-col">
                <span className="font-serif uppercase text-2xl tracking-[0.08em] leading-none mb-1">
                  PRANSH
                </span>
                <span className="font-sans uppercase text-[8px] tracking-[0.3em] opacity-60">
                  PAVNANAGAR · MAVAL
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="group flex flex-col items-end gap-1 pt-1"
              >
                <span className="font-sans uppercase text-[10px] tracking-[0.25em] font-medium mb-1">
                  CLOSE
                </span>
                <span className="h-px bg-current w-8" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col items-start px-8 py-10 gap-6 md:gap-8 my-auto">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.2, delay: 0 } }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-start gap-4 relative"
                    >
                      <span className="font-sans text-[10px] md:text-xs tracking-widest opacity-50 pt-1.5 md:pt-3">
                        {link.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif text-[34px] md:text-5xl tracking-tighter leading-none hover:text-[var(--color-gold)] transition-colors">
                          {link.name}
                        </span>
                        {/* Active Accent */}
                        {isActive && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                            className="h-px bg-[var(--color-terracotta)] mt-2"
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="px-8 pb-12 flex flex-col items-start w-full border-t border-[var(--color-parchment)]/10 pt-8 mt-auto"
            >
              <div className="font-sans uppercase text-[10px] tracking-[0.3em] opacity-60 mb-6">
                INDRAYANI RICE FROM MAVAL
              </div>
              <a
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 bg-[var(--color-terracotta)] text-[var(--color-parchment)] px-8 py-4 font-sans uppercase text-xs tracking-[0.2em] font-semibold hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors w-full justify-center max-w-sm mb-4"
              >
                ORDER ON WHATSAPP &rarr;
              </a>
              <a href="tel:9370943298" className="font-sans text-xs tracking-[0.2em] opacity-80 pl-1">
                9370943298
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
