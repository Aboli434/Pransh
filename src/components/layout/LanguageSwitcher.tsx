'use client';
import { usePathname, useRouter } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import Link from 'next/link';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const labels: Record<Locale, string> = {
    en: 'EN',
    mr: 'मराठी',
    hi: 'हिंदी'
  };

  const handleSwitch = (locale: Locale) => {
    if (pathname) {
      const segments = pathname.split('/');
      segments[1] = locale;
      router.push(segments.join('/') || '/');
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
      {locales.map((loc) => {
        // Construct the new path
        const segments = pathname ? pathname.split('/') : [''];
        if (segments.length > 1) {
          segments[1] = loc;
        } else {
          segments.push(loc);
        }
        const newPath = segments.join('/') || '/';

        return (
          <Link
            key={loc}
            href={newPath}
            className={`transition-colors duration-300 ${currentLocale === loc ? 'text-[var(--color-champagne)] font-semibold border-b border-[var(--color-champagne)]' : 'text-current opacity-50 hover:opacity-100 hover:text-[var(--color-champagne)]'}`}
            aria-label={`Switch to ${labels[loc]}`}
          >
            {labels[loc]}
          </Link>
        );
      })}
    </div>
  );
}
