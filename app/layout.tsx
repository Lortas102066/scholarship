import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NextAuthProviders } from "@/lib/next-auth/provider";


const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "スコラー",
  description: "ベストマッチした奨学金を探そう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans antialiased`}
      >
        <NextAuthProviders>
          <Header />
          <div className="pt-16">
            {children}
          </div>
          <Footer />
        </NextAuthProviders>
      </body>
    </html>
  );
}