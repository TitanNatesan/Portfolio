import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import GlobalSpotlight from "@/components/GlobalSpotlight";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Titan - Portfolio",
  description: "Portfolio of Titan Natesan",
};

import ClickSpark from "@/components/ClickSpark";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${josefinSans.variable} antialiased bg-white`}
        style={{ fontFamily: 'var(--font-josefin), sans-serif' }}
      >
        <ClickSpark
          sparkColor='#000'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <ParticlesBackground />
          <main className="relative z-10">{children}</main>
          <GlobalSpotlight />
        </ClickSpark>
      </body>
    </html>
  );
}
