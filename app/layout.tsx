import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClientWrapper } from "@/components/client-wrapper"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Bob's Corn Farm - Maíz Fresco de la Granja",
  description:
    "Compra maíz fresco directamente de la granja de Bob con nuestra política de comercio justo. Máximo 1 maíz por minuto para prácticas agrícolas sostenibles.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientWrapper>{children}</ClientWrapper>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
