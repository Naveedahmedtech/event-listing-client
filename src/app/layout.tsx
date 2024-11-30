import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/organisms/Header";
import ThemeToggle from "@/molecules/ThemeToggle";
import Footer from "@/organisms/Footer";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eventify Yours - Discover and Plan Events",
  description: "Eventify Yours helps you discover, organize, and plan amazing events tailored to your preferences. From expos to concerts, we bring the best events to you.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#00aaff",
  authors: [{ name: "Eventify Yours Team" }],
  keywords: ["Eventify Yours", "events", "discover events", "event planning", "concerts", "expos", "online events", "event management"],
  twitter: {
    card: "summary_large_image",
    site: "@EventifyYours",
    creator: "@EventifyYours",
    title: "Eventify Yours - Discover and Plan Events",
    description: "Explore top events with Eventify Yours. Join expos, concerts, and community activities tailored to your interests.",
    images: ["/assets/eventify-banner.jpg"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eventifyyours.com",
    title: "Eventify Yours - Discover and Plan Events",
    description: "Discover events and plan your next experience with Eventify Yours. From concerts to conferences, we have it all.",
    images: [
      {
        url: "/assets/eventify-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Eventify Yours - Discover and Plan Events",
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            <main className="pt-[100px]">{children}</main>
            <Footer />
            <ThemeToggle />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
