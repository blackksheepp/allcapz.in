import type { Metadata } from "next";
import { BackgroundTexture } from "./components/TextureOverlay";
import { SessionProvider } from "./providers/Session";
import "./globals.css";
import Script from "next/script";

import { IBM_Plex_Mono, Indie_Flower } from "next/font/google";
import localFont from "next/font/local";

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
      <link rel="dns-prefetch" href="https://checkout.razorpay.com/v1/checkout.js" />
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
