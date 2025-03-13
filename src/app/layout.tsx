import type { Metadata } from "next";
import { Oxygen_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import SoundSettingsProvider from "@/app/components/sound-settings-provider";
import "./globals.css";

const oxygenMono = Oxygen_Mono({
  variable: "--oxygen-mono",
  subsets: ["latin"],
  weight: "400"
});

const siteName = "Microwave Timer";
const extendedSiteName = `${siteName} | bd2720`;
const description = "A sleek, interactive, microwave-themed timer app created with Next.js, React, Tailwind, TypeScript & Tone.js. Setting timers on tasks can significantly increase your efficiency. Use Microwave Timer to set time limits on your daily tasks and get more done. Be sure to visit the Settings menu to customize your theme and enable sound effects!";
const url = "https://bd2720.github.io/microwave/";
const thumbnailUrl = `${url}microwave_thumbnail.png`;

export const metadata: Metadata = {
  title: extendedSiteName,
  description: description,
  openGraph: {
    title: extendedSiteName,
    description: description,
    url: url,
    siteName: siteName,
    images: [
      {
        url: thumbnailUrl,
        width: 1200,
        height: 630,
        alt: "Microwave"
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: extendedSiteName,
    description: description,
    images: [thumbnailUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oxygenMono.variable} antialiased bg-zinc-100 dark:bg-zinc-900`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <SoundSettingsProvider>
            {children}
          </SoundSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
