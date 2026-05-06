import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SoraStore - Belanja cepat, tanpa daftar",
  description: "Toko online Indonesia - belanja cepat tanpa ribet daftar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
