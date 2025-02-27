import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BTÜ Açık Kaynak Proje Galerisi",
  description: "Bursa Teknik Üniversitesi Açık Kaynak Proje Galerisi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-100`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
