import Script from 'next/script';
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NextAuthProviders } from "@/lib/next-auth/provider";
import { Analytics } from "@vercel/analytics/react";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "スコラー",
  description: "ベストマッチした奨学金を探そう",
  verification: {
    google: "CBiJSUcusesV65Mnj3AXEOzGPno5E0EQfPO8Dmfr3eg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X1PM5BBT08"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X1PM5BBT08');
          `}
        </Script>
        <NextAuthProviders>
          <Header />
          <div className="pt-16">{children}</div>
          <Footer />
        </NextAuthProviders>
        <Analytics />
      </body>
    </html>
  );
}
