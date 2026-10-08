'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Magnetic wrapper component for subtle hover interactions
function MagneticEffect({ children, disabled = false }: { children: React.ReactNode, disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle movement max 3-5px
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { id: 'story', num: '01', name: 'OUR STORY', href: `/our-story` },
  { id: 'journey', num: '02', name: 'JOURNEY', href: `/journey` },
  { id: 'rice', num: '03', name: 'OUR RICE', href: `/our-rice` },
  { id: 'gallery', num: '04', name: 'GALLERY', href: `/gallery` },
];

export default function Navbar({ locale }: { locale?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and Escape key for mobile menu
  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, closeMenu]);

  // Framer Motion Variants for page load animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  // Split logo letters for subtle hover effect
  const logoText = "PRANSH";

  return (
    <>
      {/* 
        DESKTOP & MOBILE NAVBAR
        Transitions smoothly on scroll
      */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out flex items-center justify-between px-6 md:px-12 bg-[#25251F] ${
          isScrolled 
            ? "py-4 md:py-5 shadow-lg shadow-black/20"
            : "py-6 md:py-8 shadow-none border-b border-[#F3EBDD]/10"
        }`}
        style={{ color: '#F3EBDD' }}
      >
        <motion.div 
          className="w-full max-w-[1600px] mx-auto flex items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* LEFT: PRANSH (with letter hover micro-interaction) */}
          <motion.div variants={itemVariants}>
            <MagneticEffect disabled={isScrolled}>
              <Link href="/" className="group flex flex-col items-start focus:outline-none">
                <div className="flex font-serif text-2xl md:text-3xl tracking-[0.08em] leading-none mb-1 overflow-hidden">
                  {logoText.split('').map((char, index) => (
                    <motion.span 
                      key={index}
                      className="inline-block relative"
                      whileHover={{ y: -2, opacity: 0.8 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="h-[1px] w-0 bg-[#B56A43] group-hover:w-full transition-all duration-500 ease-out" />
              </Link>
            </MagneticEffect>
          </motion.div>

          {/* CENTER: DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = isHoveringLink === link.id;

              return (
                <motion.div key={link.id} variants={itemVariants} className="relative flex flex-col items-center justify-center">
                  
                  {/* Traveling Active Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-[#B56A43]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <Link 
                    href={link.href}
                    onMouseEnter={() => setIsHoveringLink(link.id)}
                    onMouseLeave={() => setIsHoveringLink(null)}
                    className="relative py-2 px-1 focus:outline-none group"
                  >
                    <motion.span 
                      animate={{ 
                        y: isHovered ? -3 : 0,
                        letterSpacing: isHovered ? '0.14em' : '0.1em'
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`block font-sans uppercase text-[11px] font-medium transition-colors duration-300 ${isActive ? 'text-[#F3EBDD]' : 'text-[#F3EBDD]/70'}`}
                    >
                      {link.name}
                    </motion.span>

                    {/* Left-to-Right Draw Hover Line */}
                    <motion.div 
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute bottom-1 left-0 right-0 h-[1px] bg-[#B56A43]"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: DESKTOP ENQUIRE & MOBILE MENU */}
          <motion.div variants={itemVariants} className="flex items-center">
            
            {/* Desktop Enquire */}
            <div className="hidden lg:block">
              <MagneticEffect disabled={isScrolled}>
                <a 
                  href="/contact"
                  className="group relative flex items-center gap-2 font-sans uppercase text-[11px] tracking-[0.14em] font-medium py-2 focus:outline-none"
                >
                  <motion.span
                    animate={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    className="relative z-10"
                  >
                    ENQUIRE
                  </motion.span>
                  <motion.span 
                    className="relative z-10 text-[#B56A43]"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    ↗
                  </motion.span>
                  
                  {/* Hover Line */}
                  <div className="absolute bottom-1 left-0 w-full h-[1px] bg-[#B56A43] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              </MagneticEffect>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden group flex flex-col items-end justify-center py-2 gap-1 focus:outline-none"
              aria-label="Open menu"
            >
              <span className="font-sans uppercase text-[10px] tracking-[0.14em] font-medium mb-1">
                MENU
              </span>
              <div className="h-[1px] bg-current w-6 group-hover:w-8 transition-all duration-300 ease-out" />
              <div className="h-[1px] bg-current w-4 group-hover:w-8 transition-all duration-300 ease-out" />
            </button>
            
          </motion.div>

        </motion.div>
      </motion.header>

      {/* 
        MOBILE FULLSCREEN NAVIGATION 
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as any }}
            className="fixed inset-0 z-[100] bg-[#F3EBDD] text-[#25251F] flex flex-col overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Mobile Top Bar */}
            <div className="flex justify-between items-start px-6 py-8">
              <div className="font-serif text-2xl tracking-[0.08em] leading-none">
                PRANSH
              </div>
              <button 
                onClick={closeMenu}
                className="group flex flex-col items-end py-1 gap-1 focus:outline-none"
                aria-label="Close menu"
              >
                <span className="font-sans uppercase text-[10px] tracking-[0.14em] font-semibold mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  CLOSE
                </span>
                <div className="h-[1px] bg-[#B56A43] w-6 group-hover:w-8 transition-all duration-300 ease-out" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col justify-center px-8 py-8">
              <ul className="flex flex-col gap-8">
                {[...navLinks, { id: 'contact-mobile', num: '05', name: 'CONTACT', href: '/contact' }].map((link, i) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.7, delay: 0.1 + (i * 0.1), ease: "easeOut" as any }}
                  >
                    <Link 
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-baseline gap-4 w-fit focus:outline-none"
                    >
                      <span className="font-sans text-[11px] tracking-widest opacity-40 group-hover:-translate-y-1 transition-transform duration-300">
                        {link.num}
                      </span>
                      <div className="flex items-center overflow-hidden">
                        <span className="font-serif text-4xl tracking-tighter group-hover:translate-x-2 transition-transform duration-400 ease-out group-hover:text-[#B56A43]">
                          {link.name}
                        </span>
                        {/* Slide in arrow */}
                        <motion.span 
                          initial={{ x: -20, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="ml-4 text-[#B56A43] text-2xl"
                        >
                          →
                        </motion.span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mobile Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-8 pb-12 flex flex-col gap-4 border-t border-[#25251F]/10 pt-8"
            >
              <div className="flex flex-col">
                <span className="font-sans uppercase text-[10px] tracking-[0.14em] font-semibold">
                  INDRAYANI RICE
                </span>
                <span className="font-sans uppercase text-[10px] tracking-[0.14em] opacity-60">
                  MAVAL
                </span>
              </div>
              <a 
                href="/contact"
                onClick={closeMenu}
                className="group flex items-center gap-2 font-sans uppercase text-[11px] tracking-[0.14em] font-semibold text-[#B56A43] mt-2"
              >
                LET&apos;S TALK RICE ↗
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
