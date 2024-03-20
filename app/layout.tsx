import type { Metadata } from "next";
import { BackgroundTexture } from "./components/TextureOverlay";
import { SessionProvider } from "./Providers/Session";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALLCAPZ",
  description: "EXTRA ORDINARY ART",
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
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
