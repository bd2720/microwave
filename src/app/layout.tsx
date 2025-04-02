import type { Metadata } from "next";
import { Oxygen_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import SoundSettingsProvider from "@/app/components/settings/sound-settings-provider";
import "./globals.css";

const oxygenMono = Oxygen_Mono({
  variable: "--oxygen-mono",
  subsets: ["latin"],
  weight: "400"
});

const title = "Microwave Timer | bd2720";
const siteName = 'bd2720.github.io';
const description = "Microwave-themed timer app created with Next.js. Set time limits on your daily tasks and get more done. Visit the Settings menu to customize theme and enable sound!";
const url = "https://bd2720.github.io/microwave/";
const thumbnailUrl = `${url}microwave_thumbnail.jpg`;
const author = {
  name: "Brendan Deneen",
  url: 'https://bd2720.github.io/',
};
const keywords = [
  'custom timer', 'customizable timer', 'interactive timer', 'fun timer', 'productivity timer', 'kitchen timer', 'task timer', 'focus timer', 'time management app',
  'frontend', 'web app', 'next.js', 'next', 'react', 'tailwind', 'tailwind css', 'typescript', 'tone.js',
  'modern ui', 'sleek ui', 'tailwind components', 'responsive design',
  'audio timer', 'beep timer', 'sound effects', 'tone.js sounds', 'custom alarm', 'microwave beep', 'microwave hum',
  'themed timer', 'microwave interface', 'retro ui', 'fun app',
  'open source project', 'bd2720 microwave', 'bd2720 app',
];

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [author],
  keywords: keywords,
  openGraph: {
    title: title,
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
    title: title,
    description: description,
    images: [thumbnailUrl],
  },
  verification: {
    google: "9X9ajfDtPL6bmCt9V2k4bjm8mdweOqW3WZGiLUAlfeY",
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
