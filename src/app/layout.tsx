import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "REVO | Leave Your Mark",
  description: "Revo is a nationwide movement platform that transforms individual workouts into a shared community experience. Join the India waitlist.",
  openGraph: {
    title: "REVO | Leave Your Mark",
    description: "Your runs become permanent glowing routes on your city's live map.",
    url: "https://revo.run",
    siteName: "Revo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REVO | Leave Your Mark",
    description: "Every run leaves a visible mark. Join the Revo waitlist.",
  },
  icons: {
    icon: "/main-logo-transparent.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
