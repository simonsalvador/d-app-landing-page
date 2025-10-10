import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "D+ | Aplicación de Eventos Deportivos",
  description:
    "Organizá, descubrí y participá en eventos deportivos cerca tuyo. Plataforma para atletas y organizadores. Descargá gratis en App Store y Google Play.",
  generator: "D+ App",
  keywords: [
    "eventos deportivos",
    "organizador de torneos",
    "comunidad deportiva",
    "gestión de eventos",
    "app deportiva",
    "torneos deportivos",
    "eventos cerca de mi",
    "app para atletas",
    "organizar competencias",
    "inscripción deportiva",
    "D+ app",
    "deporte argentina",
    "eventos deportivos latinoamérica",
    "eventos deportivos buenos aires",
    "torneos argentina",
  ],
  authors: [{ name: "D+ Team" }],
  creator: "D+",
  publisher: "D+",
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
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://donde-mas.com", 
    title: "D+ – Conectando el deporte en un solo lugar",
    description:
      "Organizá, descubrí y participá en eventos deportivos cerca tuyo. La plataforma definitiva para atletas y organizadores.",
    siteName: "D+",
    images: [
      {
        url: "/dynamic-sports-action-athletes-running-jumping.jpg",
        width: 1200,
        height: 630,
        alt: "D+ - Descubrí y participá en eventos deportivos en Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D+ | Eventos deportivos en Argentina",
    description: "Organizá, descubrí y participá en eventos deportivos cerca tuyo. Descargá gratis.",
    images: ["/dynamic-sports-action-athletes-running-jumping.jpg"],
    creator: "@d+_app",
  },
  alternates: {
    canonical: "https://donde-mas.com",
    languages: {
      "es-AR": "https://donde-mas.com",
      "en-US": "https://donde-mas.com",
    },
  },
  other: {
    "geo.region": "AR",
    "geo.placename": "Argentina",
    "geo.position": "-34.603722;-58.381592",
  },
  category: "Sports",
}

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "D+",
  url: "https://donde-mas.com",
  logo: "https://donde-mas.com/logoD+.png"
};

const websiteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "D+",
  url: "https://donde-mas.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://donde-mas.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://donde-mas.com",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <meta name="geo.region" content="AR" />
        <meta name="geo.placename" content="Argentina" />
        <meta name="ICBM" content="-34.603722, -58.381592" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6600" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/LogoD+.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/LogoD+.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
