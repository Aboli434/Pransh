import { Locale } from "@/i18n/config";

import Hero from "@/components/home/Hero";
import FarmerStory from "@/components/home/FarmerStory";
import RiceJourney from "@/components/home/RiceJourney";
import RiceProduct from "@/components/home/RiceProduct";
import FarmGallery from "@/components/home/FarmGallery";
import EnquiryCTA from "@/components/home/EnquiryCTA";

export default function HomePage() {
  const typedLocale: Locale = 'en';

  return (
    <>
      <Hero locale={typedLocale} />
      <FarmerStory locale={typedLocale} />
      <RiceJourney locale={typedLocale} />
      <RiceProduct locale={typedLocale} />
      <FarmGallery locale={typedLocale} />
      <EnquiryCTA locale={typedLocale} />
    </>
  );
}
