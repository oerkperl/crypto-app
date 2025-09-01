import "./globals.css";
import StoreProvider from "./store/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CryptoContextProvider } from "./context/context";
import { TopSection } from "./ui/TopSections";
import { TheThemeProvider } from "./ui/TheThemProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto App - Real-time Cryptocurrency Tracker",
  description:
    "Track cryptocurrency prices, manage your portfolio, and stay updated with market trends in real-time.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`bg-gray-100 dark:bg-gray-950 relative dark:text-gray-400 ${inter.className}`}
      >
        <TheThemeProvider>
          <CryptoContextProvider>
            <StoreProvider>
              <TopSection />
              {children}
            </StoreProvider>
          </CryptoContextProvider>
        </TheThemeProvider>
      </body>
    </html>
  );
}
