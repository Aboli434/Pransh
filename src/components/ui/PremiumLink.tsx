'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  isExternal?: boolean;
}

export default function PremiumLink({ href, children, className = '', isExternal = false }: PremiumLinkProps) {
  // We want to force the hover background to be Sand (#EAE5D9) and hover text to be Charcoal (#1B2B1F).
  // We strip any existing hover backgrounds or text colors from the passed className just in case.
  const cleanClassName = className
    .replace(/hover:bg-\S+/g, '')
    .replace(/hover:text-\S+/g, '')
    .replace(/hover:scale-\S+/g, '')
    .trim();

  const finalClassName = `relative flex items-center justify-center font-sans uppercase tracking-[0.2em] font-semibold transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] ${cleanClassName}`;

  const Inner = () => (
    <>
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12"
        initial={{ x: "-150%" }}
        whileHover={{ x: "150%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </>
  );

  return (
    <motion.div
      className="rounded-[6px] overflow-hidden inline-block"
      whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {isExternal ? (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={finalClassName}
        >
          <Inner />
        </a>
      ) : href.startsWith('tel:') || href.startsWith('mailto:') ? (
        <a 
          href={href}
          className={finalClassName}
        >
          <Inner />
        </a>
      ) : (
        <Link href={href} className={finalClassName}>
          <Inner />
        </Link>
      )}
    </motion.div>
  );
}
