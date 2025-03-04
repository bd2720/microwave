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

export const metadata: Metadata = {
  title: "Microwave Timer",
  description: "Microwave Timer application built with React and Next.js",
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
