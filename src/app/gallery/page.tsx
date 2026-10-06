import { Locale } from '@/i18n/config';
import { getDictionary } from '@/lib/i18n';
import GalleryClient from './GalleryClient';

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return <GalleryClient />;
}
