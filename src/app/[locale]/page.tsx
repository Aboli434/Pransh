import { Locale } from "@/i18n/config";

import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import FarmerStory from "@/components/home/FarmerStory";
import RiceJourney from "@/components/home/RiceJourney";
import RiceProduct from "@/components/home/RiceProduct";
import FarmGallery from "@/components/home/FarmGallery";
import EnquiryCTA from "@/components/home/EnquiryCTA";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <>
      <Hero locale={typedLocale} />
      <Introduction />
      <FarmerStory locale={typedLocale} />
      <RiceJourney locale={typedLocale} />
      <RiceProduct locale={typedLocale} />
      <FarmGallery locale={typedLocale} />
      <EnquiryCTA locale={typedLocale} />
    </>
  );
}
