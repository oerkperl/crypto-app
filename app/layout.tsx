import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TopSection } from "../components/nav/TopSections";
import { TheThemeProvider } from "../providers/TheThemProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinage - Real-time Cryptocurrency Tracker",
  description:
    "Track cryptocurrency prices, manage your portfolio, and stay updated with market trends in real-time.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`bg-gray-100 dark:bg-gray-950 relative dark:text-gray-400 ${inter.className}`}
      >
        <TheThemeProvider>
          <TopSection />
          {children}
        </TheThemeProvider>
      </body>
    </html>
  );
}
