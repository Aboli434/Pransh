'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default async function ContactPage() {
  return (
    <main className="pt-32 md:pt-48 pb-32 bg-[var(--color-parchment)] min-h-screen flex items-center justify-center text-[var(--color-charcoal)] relative overflow-hidden">
      
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center mix-blend-multiply" />

      <Container>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif leading-[0.85] tracking-tighter mb-8">
              LET'S TALK<br/>
              <span className="italic font-light opacity-90 text-[var(--color-gold)]">RICE.</span>
            </h1>
            <p className="text-base md:text-lg font-sans uppercase tracking-[0.1em] text-[var(--color-charcoal)]/70 max-w-sm mb-12">
              For Indrayani rice enquiries, orders and availability.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start md:items-end md:text-right">
            
            <a 
              href="tel:9370943298" 
              className="text-4xl md:text-5xl font-serif hover:text-[var(--color-gold)] transition-colors inline-block mb-4"
            >
              9370943298
            </a>
            <a 
              href="mailto:unmeshrisbud345@gmail.com" 
              className="text-2xl md:text-3xl font-serif hover:text-[var(--color-gold)] transition-colors inline-block mb-12 lowercase"
            >
              unmeshrisbud345@gmail.com
            </a>
            
            <div className="text-xs font-sans uppercase tracking-[0.3em] font-semibold text-[var(--color-charcoal)]/50 mb-12">
              PAVNANAGAR · MAVAL
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center md:items-end justify-end w-full">
              <motion.div className="rounded-[6px] overflow-hidden inline-block" whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3, ease: "easeOut" }}>
<a 
                href="https://wa.me/919370943298?text=Hello,%20I%20would%20like%20to%20enquire%20about%20ordering%20Indrayani%20Rice."
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center rounded-[6px] transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] inline-block border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-[var(--color-parchment)] px-10 py-5 text-xs font-sans uppercase tracking-[0.3em] font-bold    text-center w-full sm:w-auto"
              >
<span className="relative z-10">ORDER ON WHATSAPP</span>
<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12" initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.7, ease: "easeInOut" }} />

</a>
</motion.div>
              <motion.div className="rounded-[6px] overflow-hidden inline-block" whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3, ease: "easeOut" }}>
<a 
                href="tel:9370943298" 
                className="relative flex items-center justify-center rounded-[6px] transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-10 py-5 text-xs font-sans uppercase tracking-[0.3em] font-bold    text-center w-full sm:w-auto"
              >
<span className="relative z-10">CALL</span>
<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12" initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.7, ease: "easeInOut" }} />

</a>
</motion.div>
            </div>

          </div>

        </div>
      </Container>
    </main>
  );
}
