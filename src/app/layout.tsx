import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-cormorant' 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pransh.farm"),
  title: "PRANSH | Direct From Farm",
  description: "A premium agricultural brand offering direct access to farm harvests. Discover the journey of PRANSH rice from seed to final grain.",
  keywords: ["agriculture", "premium rice", "direct from farm", "farmer", "PRANSH"],
  openGraph: {
    title: "PRANSH | Direct From Farm",
    description: "A premium agricultural brand offering direct access to farm harvests.",
    url: "https://pransh.farm",
    siteName: "PRANSH",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "PRANSH Farm Landscape",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
