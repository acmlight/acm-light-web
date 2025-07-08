import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import { headerName } from "@/lib/i18n";
import "@/assets/styles/globals.css";

import { dir } from 'i18next'
import { languages, getT } from '@/lib/i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata() {
  const headerList = await headers()
  const lng = headerList.get(headerName) as 'en' | 'es'
  const { t } = await getT(lng)
  return {
    title: t('home.meta-title'),
    content: t('home.meta-description')
  }
}

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string; }>;
}>) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
