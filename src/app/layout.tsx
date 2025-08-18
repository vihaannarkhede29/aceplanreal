import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "AcePlan - Practice Hard. Play harder. Get Your Tennis Equipment Plan",
  description: "Get your personalized tennis equipment recommendations and training plan. Take our quiz to find the perfect racket, strings, and gear for your game.",
  keywords: "tennis equipment, tennis racket, tennis strings, tennis training, tennis quiz, personalized tennis",
  authors: [{ name: "AcePlan" }],
  icons: {
    icon: '/aceplanlogo.png',
    shortcut: '/aceplanlogo.png',
    apple: '/aceplanlogo.png',
  },
  openGraph: {
    title: "AcePlan - Practice Hard. Play harder. Get Your Tennis Equipment Plan",
    description: "Get your personalized tennis equipment recommendations and training plan. Take our quiz to find the perfect racket, strings, and gear for your game.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcePlan - Practice Hard. Play harder. Get Your Tennis Equipment Plan",
    description: "Get your personalized tennis equipment recommendations and training plan. Take our quiz to find the perfect racket, strings, and gear for your game.",
  },
  robots: "index, follow",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
