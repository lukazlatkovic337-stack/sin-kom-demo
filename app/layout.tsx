import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./_shared/Localization/LanguageContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./_shared/Sidebar/Sidebar";
import { Providers } from "./_shared/Sidebar/providers";
import { Manrope } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garni Hotel Sin-Kom - Pirot",
  description: "Garni Hotel Sin-Kom počeo je sa radom 01. jula 2009. godine. Posluje na principu noćenja sa doručkom (bed&breakfast) i kategorisan je kao garni Hotel sa 3* od strane nadležnog Ministarstva Republike Srbije.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white dark:bg-black">
        <LanguageProvider>
          <Providers>
            <Header />
            <Sidebar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
