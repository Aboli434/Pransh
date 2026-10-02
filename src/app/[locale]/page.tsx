import { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import FarmerStory from "@/components/home/FarmerStory";
import RiceJourney from "@/components/home/RiceJourney";
import RiceProduct from "@/components/home/RiceProduct";
import DirectFromFarm from "@/components/home/DirectFromFarm";
import FarmGallery from "@/components/home/FarmGallery";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <>
      <Hero locale={typedLocale} />
      <FarmerStory locale={typedLocale} />
      <RiceJourney locale={typedLocale} />
      <RiceProduct locale={typedLocale} />
      <DirectFromFarm locale={typedLocale} />
      <FarmGallery locale={typedLocale} />
      
      <Container className="pt-24 pb-20">
        <div className="space-y-24">

          <section id="contact">
            <h2 className="text-3xl font-serif mb-4">Contact</h2>
            <div className="p-8 bg-white/50 rounded border border-gray-200">
              <p className="text-sm text-gray-500">[placeholder]</p>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
