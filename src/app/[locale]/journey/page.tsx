import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import JourneyPageClient from './JourneyPageClient';

export default async function JourneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return <JourneyPageClient />;
}
