import Layout from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Catamaran, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Sijarta",
  description: "Sijarta by ngeQuery team",
};

const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: "--font-catamaran",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      suppressContentEditableWarning
      lang="en">
      <body
        className={`${dmsans.variable} ${catamaran.variable} antialiased`}
      >
        <Navbar />
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
