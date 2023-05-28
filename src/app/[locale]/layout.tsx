'use server';
import '../globals.css';
import styles from './layout.module.css';
import React from 'react';
import { Metadata } from 'next';
import Link from "next/link";
import Config from "../../services/Config.service";
import { getLocales } from 'lup-language';
import loadTranslations from "./translations";
import Copyright from "../(layout)/Copyright";
import ActiveLink from "../(layout)/ActiveLinks";
import { OptimizedImage } from "lup-images";
import Socialmedia from "../(components)/Socialmedia";


type RootLayoutProps = {
  children: React.ReactNode,
  params: { locale: string },
}

// layout
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params.locale;
  const TEXT = await loadTranslations(locale, ['AboutMe', 'Contact', 'Imprint', 'Legal', 'NAME', 'Privacy', 'Projects']);

  return (
    <html lang={locale}>
      <body className={styles.layout}>
        <div className={styles.background}>
          <OptimizedImage width={7256} src="/images/background.jpg" alt="Background" extraHighResolution />
        </div>

        <header>
          <div>
            <Link href="/"><h1>Luca Vogels</h1></Link>
            <nav>
              <ActiveLink href="/" activeClassName={styles.active} locale={locale}>{TEXT['AboutMe']}</ActiveLink>
              <ActiveLink href="/projects/" activeClassName={styles.active} locale={locale}>{TEXT['Projects']}</ActiveLink>
              <ActiveLink href="/contact/" activeClassName={styles.active} locale={locale}>{TEXT['Contact']}</ActiveLink>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      
        <footer>
          <div>

            <Link href="/"><h1>Luca Vogels</h1></Link>

            <div>
              <b>{TEXT['AboutMe']}</b>
              <ActiveLink href="/" activeClassName={styles.active} locale={locale}>{TEXT['AboutMe']}</ActiveLink>
              <ActiveLink href="/projects/" activeClassName={styles.active} locale={locale}>{TEXT['Projects']}</ActiveLink>
              <ActiveLink href="/contact/" activeClassName={styles.active} locale={locale}>{TEXT['Contact']}</ActiveLink>
            </div>

            <div>
              <b>{TEXT['Legal']}</b>
              <ActiveLink href="/contact/" activeClassName={styles.active} locale={locale}>{TEXT['Contact']}</ActiveLink>
              <ActiveLink href="/imprint/" activeClassName={styles.active} locale={locale}>{TEXT['Imprint']}</ActiveLink>
              <ActiveLink href="/privacy/" activeClassName={styles.active} locale={locale}>{TEXT['Privacy']}</ActiveLink>
            </div>

            <Socialmedia locale={locale} />

          </div>
          <Copyright name={TEXT['NAME']} />
        </footer>

      </body>
    </html>
  )
}

// default routes
export async function generateStaticParams(context: any){
  const locales = await getLocales();
  return locales.map((locale) => ({ locale: locale }));
}

// default metadata (static)
export async function generateMetadata(context: any): Promise<Metadata>{
  const domain = Config.getDomain();
  const urlPrefix = "https://"+domain;
  return {
    applicationName: "Luca-Vogels.com",
    authors: [
      {
        name: "Luca Vogels",
        url: "https://luca-vogels.com",
      }
    ],
    creator: "Luca Vogels",
    publisher: "Luca Vogels",
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
      { media: "(prefers-color-scheme: light)", color: "#ffffff" }
    ],
    icons: [
      {rel: "icon", type: "image/png", sizes: "16x16", url: "/images/favicons/favicon-16x16.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", url: "/images/favicons/favicon-32x32.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", url: "/images/favicons/favicon-96x96.png"},

      {rel: "icon", type: "image/png", sizes: "36x36", url: "/images/favicons/android-icon-36x36.png"},
      {rel: "icon", type: "image/png", sizes: "48x48", url: "/images/favicons/android-icon-48x48.png"},
      {rel: "icon", type: "image/png", sizes: "72x72", url: "/images/favicons/android-icon-72x72.png"},
      {rel: "icon", type: "image/png", sizes: "144x144", url: "/images/favicons/android-icon-96x96.png"},
      {rel: "icon", type: "image/png", sizes: "192x192", url: "/images/favicons/android-icon-192x192.png"},

      {rel: "apple-touch-icon", sizes: "57x57", url: "/images/favicons/apple-icon-57x57.png"},
      {rel: "apple-touch-icon", sizes: "60x60", url: "/images/favicons/apple-icon-60x60.png"},
      {rel: "apple-touch-icon", sizes: "72x72", url: "/images/favicons/apple-icon-72x72.png"},
      {rel: "apple-touch-icon", sizes: "76x76", url: "/images/favicons/apple-icon-76x76.png"},
      {rel: "apple-touch-icon", sizes: "114x114", url: "/images/favicons/apple-icon-114x114.png"},
      {rel: "apple-touch-icon", sizes: "120x120", url: "/images/favicons/apple-icon-120x120.png"},
      {rel: "apple-touch-icon", sizes: "144x144", url: "/images/favicons/apple-icon-144x144.png"},
      {rel: "apple-touch-icon", sizes: "152x152", url: "/images/favicons/apple-icon-152x152.png"},
      {rel: "apple-touch-icon", sizes: "180x180", url: "/images/favicons/apple-icon-180x180.png"},
    ],
    manifest: "/manifest.json",
    viewport: 'width=device-width, initial-scale=1.0',
  }
}