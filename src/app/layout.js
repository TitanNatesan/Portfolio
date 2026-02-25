import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import GlobalSpotlight from "@/components/GlobalSpotlight";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://titandev.me"),
  title: {
    default: "Titan Natesan | Full Stack Developer & AI Engineer",
    template: "%s | Titan Natesan",
  },
  description:
    "Portfolio of Titan Natesan — Full Stack Developer, AI Enthusiast, and Backend Specialist. Expert in Next.js, Django, Python, TensorFlow, PyTorch, and modern web technologies.",
  keywords: [
    "Titan Natesan",
    "Full Stack Developer",
    "AI Engineer",
    "Portfolio",
    "Next.js",
    "Django",
    "Python",
    "Machine Learning",
    "Backend Developer",
    "React",
    "TensorFlow",
    "PyTorch",
    "Web Developer",
  ],
  authors: [{ name: "Titan Natesan", url: "https://titandev.me" }],
  creator: "Titan Natesan",
  publisher: "Titan Natesan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://titandev.me",
    siteName: "Titan Natesan — Portfolio",
    title: "Titan Natesan | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Enthusiast building innovative solutions with Next.js, Django, Python, and cutting-edge AI/ML technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Titan Natesan - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Natesan | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Enthusiast building innovative solutions with modern technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://titandev.me",
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
  },
};

import ClickSpark from "@/components/ClickSpark";
import Loader from "@/components/Loader";

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Titan Natesan",
  url: "https://titandev.me",
  jobTitle: "Full Stack Developer & AI Engineer",
  description:
    "Passionate computer science enthusiast specializing in full-stack development and AI/ML engineering.",
  sameAs: [
    "https://linkedin.com/in/titannatesan",
    "https://github.com/TitanNatesan",
    "https://instagram.com/titan_natesan",
    "https://facebook.com/titannatesan",
  ],
  knowsAbout: [
    "Full Stack Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "Django",
    "Next.js",
    "React",
    "TensorFlow",
    "PyTorch",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Karpagam Academy of Higher Education",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${josefinSans.variable} antialiased bg-white page-loading`}
        style={{ fontFamily: "var(--font-josefin), sans-serif" }}
      >
        <Loader />
        <ClickSpark
          sparkColor="#000"
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
