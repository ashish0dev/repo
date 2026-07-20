import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#2E7D5B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://revo.origina.in"),
  title: {
    default: "REVO | Leave Your Mark",
    template: "%s | REVO",
  },
  description: "REVO is a pre-launch community fitness visibility movement from India. We transform everyday runs, walks, and cycles into shared, visible marks on local neighborhood maps.",
  keywords: ["community fitness", "running India", "habit consistency", "neighborhood fitness hubs", "REVO fitness", "local running groups"],
  alternates: {
    canonical: "https://revo.origina.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "cYGsKKChmyHgGxCXYZyaQAvhqpLGqHPhTwXH407QagA",
  },
  openGraph: {
    title: "REVO | Leave Your Mark",
    description: "REVO is a community fitness visibility movement from India. Your runs become permanent glowing routes on your city's live map.",
    url: "https://revo.origina.in",
    siteName: "REVO",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://revo.origina.in/blog-default-cover.png",
        width: 1200,
        height: 630,
        alt: "REVO - Community Fitness Visibility Movement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REVO | Leave Your Mark",
    description: "Every run leaves a visible mark. Join the REVO waitlist and light up your neighborhood map.",
    images: ["https://revo.origina.in/blog-default-cover.png"],
  },
  icons: {
    icon: "/main-logo-transparent.png",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "REVO",
  "url": "https://revo.origina.in",
  "logo": "https://revo.origina.in/main-logo-transparent.png",
  "sameAs": [
    "https://www.linkedin.com/company/therevofitness",
    "https://www.instagram.com/movewithrevo/"
  ],
  "foundingPlace": {
    "@type": "Place",
    "name": "India"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "REVO",
  "url": "https://revo.origina.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://revo.origina.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="antialiased scroll-smooth" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <JsonLd schema={orgSchema} />
        <JsonLd schema={websiteSchema} />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
