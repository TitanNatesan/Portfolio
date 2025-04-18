import "./globals.css";
import "./mobile.css";
import NavBar from "./components/sub-comp/NavBar";
import ParticlesComponent from "./components/particles/Particles";
import { particlesConfig } from "./utils/particles.config";
import ParticlesGB from "./components/particles/ParticlesGB";
import SideCard from "./components/sub-comp/SideCard";
import Progress from "./components/sub-comp/progressbar";
import Script from "next/script";

export const metadata = {
  title: "Titan Natesan - Natesan K | Titan Dev | Full Stack Developer in Tiruppur",
  description: "Natesan K, also known as Titan Natesan or Titan Dev, is a full stack developer from Tiruppur. Specializing in web development, AI projects, and Django, Titan the developer delivers high-quality digital solutions.",
  keywords: "Natesan K, Titan Natesan, Titan Dev, Titan the developer, Full Stack Developer, Tiruppur developer, Web Development, AI Enthusiast, Python Developer, Django Developer",
  authors: [{ name: "Titan Natesan" }],
  openGraph: {
    title: "Titan Natesan - Full Stack Developer & AI Enthusiast",
    description: "Explore the portfolio of Titan Natesan, a creative full stack developer with expertise in web development, AI, and innovative digital solutions.",
    url: "https://titandev.ninja/",
    siteName: "Titan Natesan Portfolio",
    images: [
      {
        url: "https://titandev.ninja/icons/og.png",
        width: 800,
        height: 600,
        alt: "Titan Natesan Portfolio Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Natesan - Full Stack Developer & AI Enthusiast",
    description: "Titan Natesan, known as Titan Dev, specializes in high-quality digital solutions as a full stack developer from Tiruppur.",
    images: ["https://titandev.ninja/icons/og.png"],
    site: "@TitanNatesan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": 50,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="true" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Courgette&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Satisfy&display=swap" rel="stylesheet" />
        <Script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>

      </head>
      <body className={`antialiased lg:grid`}>
        <div className="absolute w-full h-full -z-20 flex justify-center items-center">
          <img className="absolute bg-blend-difference invert opacity-15 scale-95" src="https://particles.js.org/images/smalldeer.svg" alt="svg" />
        </div>

        <Progress />
        <ParticlesComponent options={particlesConfig} />
        <ParticlesGB />
        <SideCard />
        {children}
        <NavBar />
      </body>
    </html>
  );
}
