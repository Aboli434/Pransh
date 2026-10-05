import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import OurRiceClient from './OurRiceClient';

export default async function OurRicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return <OurRiceClient />;
}
