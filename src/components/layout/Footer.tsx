import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { brandConfig } from '@/data/brand';
import Container from '../ui/Container';

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-[var(--primary)] text-[var(--color-ivory)] py-16 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif tracking-widest">{brandConfig.name}</h3>
            <p className="text-[var(--color-sage)] text-sm max-w-sm leading-relaxed">
              {brandConfig.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[var(--color-champagne)]">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}`} className="hover:text-[var(--color-champagne)] transition-colors">{dict.navigation.home}</Link></li>
              <li><Link href={`/${locale}#story`} className="hover:text-[var(--color-champagne)] transition-colors">{dict.navigation.ourStory}</Link></li>
              <li><Link href={`/${locale}#journey`} className="hover:text-[var(--color-champagne)] transition-colors">{dict.navigation.theJourney}</Link></li>
              <li><Link href={`/${locale}#rice`} className="hover:text-[var(--color-champagne)] transition-colors">{dict.navigation.ourRice}</Link></li>
              <li><Link href={`/${locale}#gallery`} className="hover:text-[var(--color-champagne)] transition-colors">{dict.navigation.gallery}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[var(--color-champagne)]">Contact</h4>
            <ul className="space-y-3 text-sm text-[var(--color-ivory)]/80">
              <li>{brandConfig.contact.phone}</li>
              <li>{brandConfig.contact.email}</li>
              <li className="pt-2">{brandConfig.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[var(--color-champagne)]">Language</h4>
            <div className="flex gap-4 text-sm">
              <Link href="/en" className={locale === 'en' ? 'text-white' : 'text-white/50 hover:text-white'}>EN</Link>
              <Link href="/mr" className={locale === 'mr' ? 'text-white' : 'text-white/50 hover:text-white'}>मराठी</Link>
              <Link href="/hi" className={locale === 'hi' ? 'text-white' : 'text-white/50 hover:text-white'}>हिंदी</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-deep-olive)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-sage)]">
          <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link href="#" className="hover:text-[var(--color-ivory)]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--color-ivory)]">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
