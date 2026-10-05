'use client';
import { usePathname, useRouter } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';

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
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={`transition-colors duration-300 ${currentLocale === loc ? 'text-[var(--color-champagne)] font-semibold border-b border-[var(--color-champagne)]' : 'text-current opacity-50 hover:opacity-100 hover:text-[var(--color-champagne)]'}`}
          aria-label={`Switch to ${labels[loc]}`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
