import type { Metadata } from "next";
import { BackgroundTexture } from "./components/TextureOverlay";
import { SessionProvider } from "./providers/Session";
import "./globals.css";
import Script from "next/script";

import { IBM_Plex_Mono, Indie_Flower } from "next/font/google";
import localFont from "next/font/local";

import { GoogleAnalytics } from '@next/third-parties/google'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  preload: false,
  display: "swap"
})

const indieFlower = Indie_Flower({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-indie-flower",
  preload: false,
  display: "swap"
})

const retro = localFont({
  src: [
    {
      path: "../public/assets/retro-gaming.ttf",
      style: "normal",
    }
  ],
  variable: "--font-retro",
  preload: false,
  display: "swap"
})

const gloria = localFont({
  src: [
    {
      path: "../public/assets/gloria-hallelujah.ttf",
      style: "normal",
    }
  ],
  variable: "--font-gloria",
  preload: false,
  display: "swap"
})

export const metadata: Metadata = {
  title: "ALLCAPZ",
  description: "Level up your space with avant-garde posters that add personality and flair to your living area. Browse our latest collections and take advantage of exclusive deals.Level up your space with avant-garde posters that add personality and flair to your living area. Browse our latest collections and take advantage of exclusive deals.",
  openGraph: {
    title: "ALLCAPZ",
    images: {
      url: "https://d3lqxujayvqlsx.cloudfront.net/img/preview.jpg",
      width: 853,
      height: 427,
    },
    ttl: 1,
    description: "Level up your space with our avant-garde posters."
  },
  twitter: {
    title: "ALLCAPZ",
    images: {
      url: "https://d3lqxujayvqlsx.cloudfront.net/img/preview.jpg",
      width: 853,
      height: 427,

    },
    description: "Level up your space with our avant-garde posters."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="bg-black">
        <SessionProvider>
            <BackgroundTexture />
            <main className={`${retro.variable} ${ibmPlexMono.variable} ${indieFlower.variable} ${gloria.variable}`}>{children}</main>
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-MCD98LP6LK" />
      <link rel="dns-prefetch" href="https://checkout.razorpay.com/v1/checkout.js" />
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
