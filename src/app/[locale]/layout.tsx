import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Locale } from "@/i18n/config";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  return (
    <SmoothScrollProvider>
      <Navbar locale={typedLocale} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale={typedLocale} />
    </SmoothScrollProvider>
  );
}
