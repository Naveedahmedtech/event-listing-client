import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReduxProvider from './ReduxProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/organisms/Header';
import ThemeToggle from '@/molecules/ThemeToggle';
import Footer from '@/organisms/Footer';
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Eventify Yours - Discover and Plan Events',
  description:
    'Eventify Yours helps you discover, organize, and plan amazing events tailored to your preferences. From expos to concerts, we bring the best events to you.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="var(--primary)" />
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            <main className="pt-24">{children}</main>
            <Footer />
            <ThemeToggle />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
