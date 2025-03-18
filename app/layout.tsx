import type { Metadata } from "next";
import { BackgroundTexture } from "./components/TextureOverlay";
import { SessionProvider } from "./providers/Session";
import "./globals.css";
import Script from "next/script";

import localFont from "next/font/local";

import { GoogleAnalytics } from '@next/third-parties/google'

export const ibmPlexMono = localFont({
  src: [
    {
      path: '../public/assets/IBMPlexMono-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/assets/IBMPlexMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/assets/IBMPlexMono-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
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
  description: "Discover unique avant-garde posters to elevate your living space. Shop exclusive collections and enjoy free shipping.",
  openGraph: {
    title: "ALLCAPZ",
    images: {
      url: "https://media.allcapz.in/img/preview.jpg",
      width: 853,
      height: 427,
    },
    ttl: 1,
    description: "Level up your space with our avant-garde posters."
  },
  twitter: {
    title: "ALLCAPZ",
    images: {
      url: "https://media.allcapz.in/img/preview.jpg",
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
          <main className={`${retro.variable} ${ibmPlexMono.variable} ${gloria.variable}`}>{children}</main>
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-MCD98LP6LK" />
      <link rel="dns-prefetch" href="https://checkout.razorpay.com/v1/checkout.js" />
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
