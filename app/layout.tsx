import type { Metadata, Viewport } from "next";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const SHARE_TITLE = "Stockscout: Top 10 stocks per theme, ranked by ETF consensus";
const SHARE_DESC =
  "See which names active ETF managers actually back. Top 10 equities per theme, ranked by consensus and portfolio weight. Free, no login, updated daily.";

export const metadata: Metadata = {
  metadataBase: new URL("https://stockscout.io"),
  title: "Stockscout, ETF Holdings Analyser",
  description: "Discover the top 10 equities per sector, ranked by ETF consensus and portfolio weight. Updated daily.",
  openGraph: {
    type: "website",
    url: "https://stockscout.io",
    siteName: "Stockscout",
    title: SHARE_TITLE,
    description: SHARE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollToTop />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
