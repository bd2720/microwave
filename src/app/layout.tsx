import type { Metadata } from "next";
import { Oxygen_Mono } from "next/font/google";
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
    <html lang="en">
      <body
        className={`${oxygenMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
