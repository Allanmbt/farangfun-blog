import "@/app/globals.css";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@/components/Analytics";
import { Montserrat, Inter, Space_Grotesk } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = constructMetadata({
  title: "FarangFun - Guide for Nights Out in Bangkok",
  description: "The ultimate nightlife guide for Bangkok, Pattaya, and Chiang Mai. Thailand - LARGEST DIRECTORY of the best places to find the hottest girls and amazing service!",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>

        <ThemeProvider disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}