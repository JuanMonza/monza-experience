import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Juan Monza — Software Engineer",
    template: "%s | Juan Monza",
  },

  description:
    "Full Stack Software Engineer building immersive digital products, scalable platforms, AI-powered experiences and modern web applications.",

  keywords: [
    "Juan Monza",
    "Juan Monsalve",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI Engineer",
    "Three.js",
  ],

  authors: [
    {
      name: "Juan Monza",
    },
  ],

  creator: "Juan Monza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geist.variable}
          ${geistMono.variable}
          ${inter.variable}
        `}
      >
        {children}

        <div
          className="noise"
          aria-hidden="true"
        />
      </body>
    </html>
  );
}