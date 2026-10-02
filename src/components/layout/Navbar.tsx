'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import { Locale } from '@/i18n/config';
import { brandConfig } from '@/data/brand';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '../ui/Button';
import Container from '../ui/Container';

export default function Navbar({ locale }: { locale: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = getDictionary(locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: dict.navigation.home, href: `/${locale}` },
    { name: dict.navigation.ourStory, href: `/${locale}#story` },
    { name: dict.navigation.theJourney, href: `/${locale}#journey` },
    { name: dict.navigation.ourRice, href: `/${locale}#rice` },
    { name: dict.navigation.gallery, href: `/${locale}#gallery` },
    { name: dict.navigation.contact, href: `/${locale}#contact` },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[var(--color-ivory)]/90 backdrop-blur-md py-4 border-b border-[var(--color-warm-beige)]' 
            : 'bg-transparent py-6'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image 
                src={brandConfig.logo} 
                alt={brandConfig.name} 
                width={140} 
                height={40} 
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm tracking-widest uppercase">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="h-4 w-px bg-gray-300"></div>
              
              <LanguageSwitcher currentLocale={locale} />
              
              <Button variant="primary">{dict.navigation.enquireNow}</Button>
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-[var(--primary)]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--color-ivory)] flex flex-col pt-24 px-6 pb-12"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-[var(--primary)]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col gap-6 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              className="mt-auto space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <LanguageSwitcher currentLocale={locale} />
              <Button variant="primary" className="w-full justify-center">
                {dict.navigation.enquireNow}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
